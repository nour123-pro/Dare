using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class UserRepository : GenricRepository<User>
    {
        private readonly AccountRepository _accountRepo;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(
            ApplicationDbContext context,
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            AccountRepository accountRepository,
            ILogger<UserRepository> logger) : base(context)
        {
            _accountRepo = accountRepository;
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<IActionResult> RegisterUserAsync(UserRegistrationDto registrationDto)
        {
            try
            {
                // Validate input
                var validationResult = ValidateRegistration(registrationDto);
                if (validationResult != null)
                {
                    return validationResult;
                }

                // Create user entity
                var user = new User
                {
                    UserName = registrationDto.Username,
                    Email = registrationDto.Email,
                    FirstName = registrationDto.FirstName,
                    LastName = registrationDto.LastName,
                    BirthDate = registrationDto.BirthDate,
                    gender = MapGender(registrationDto.Gender),
                    CreatedAt = DateTime.UtcNow
                };

                // Create user account
                var creationResult = await _userManager.CreateAsync(user, registrationDto.Password);
                if (!creationResult.Succeeded)
                {
                    return HandleIdentityErrors(creationResult.Errors);
                }

                // Create associated account
                var accountCreationResult = await CreateUserAccountAsync(user);
                if (accountCreationResult != null)
                {
                    return accountCreationResult;
                }

                return new OkObjectResult(new UserRegistrationResponse
                {
                    Success = true,
                    UserId =user.Id.ToString(),
                    Message = "User registered successfully",
                    //AccountId=accountCreationResult?.account.AccountId
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user registration");
                return HandleException(ex);
            }
        }

        public async Task<IActionResult> LoginUserAsync(UserLoginDto loginDto)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(loginDto.Username) || 
                    string.IsNullOrWhiteSpace(loginDto.Password))
                {
                    return new BadRequestObjectResult(new ErrorResponse
                    {
                        ErrorCode = "INVALID_INPUT",
                        Message = "Username and password are required"
                    });
                }

                // Find user
                var user = await _userManager.FindByNameAsync(loginDto.Username);
                if (user == null)
                {
                    return new NotFoundObjectResult(new ErrorResponse
                    {
                        ErrorCode = "USER_NOT_FOUND",
                        Message = "User not found"
                    });
                }

                // Attempt login
                var result = await _signInManager.PasswordSignInAsync(
                    user, 
                    loginDto.Password, 
                    isPersistent: false, 
                    lockoutOnFailure: false);

                if (!result.Succeeded)
                {
                    return new UnauthorizedObjectResult(new ErrorResponse
                    {
                        ErrorCode = "INVALID_CREDENTIALS",
                        Message = "Invalid username or password"
                    });
                }

                return new OkObjectResult(new UserLoginResponse
                {
                    Success = true,
                    UserId = user.Id.ToString(),
                    Message = "Login successful"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user login");
                return HandleException(ex);
            }
        }

        #region Helper Methods

        private IActionResult? ValidateRegistration(UserRegistrationDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Username))
            {
                return new BadRequestObjectResult(new ErrorResponse
                {
                    ErrorCode = "USERNAME_REQUIRED",
                    Message = "Username is required",
                    Field = "username"
                });
            }

            if (string.IsNullOrWhiteSpace(dto.Password))
            {
                return new BadRequestObjectResult(new ErrorResponse
                {
                    ErrorCode = "PASSWORD_REQUIRED",
                    Message = "Password is required",
                    Field = "password"
                });
            }

            if (!new[] { "male", "female", "other" }.Contains(dto.Gender.ToLower()))
            {
                return new BadRequestObjectResult(new ErrorResponse
                {
                    ErrorCode = "INVALID_GENDER",
                    Message = "Invalid gender specified",
                    AllowedValues = new[] { "male", "female", "other" },
                    Field = "gender"
                });
            }

            return null;
        }

        private User.Gender MapGender(string gender)
        {
            return gender.ToLower() switch
            {
                "female" => User.Gender.Female,
                "male" => User.Gender.Male,
                _ => User.Gender.Male
            };
        }

        private async Task<IActionResult> CreateUserAccountAsync(User user)
        {
            try
            {
                var account = new Account
                {
                    AccountName = user.UserName,
                    UserId = user.Id,
                    CreatedAt = DateTime.UtcNow
                };

                await _accountRepo.AddAsync(account);
                return new  OkObjectResult(account);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user account");
                return new ObjectResult(new ErrorResponse
                {
                    ErrorCode = "ACCOUNT_CREATION_FAILED",
                    Message = "Error creating user account"
                })
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }

        private IActionResult HandleIdentityErrors(IEnumerable<IdentityError> errors)
        {
            var errorDetails = errors.Select(e => new ErrorDetail
            {
                Code = e.Code,
                Description = e.Description,
                Field = MapErrorToField(e.Code)
            });

            return new BadRequestObjectResult(new ErrorResponse
            {
                ErrorCode = "IDENTITY_VALIDATION_FAILED",
                Message = "User creation failed due to validation errors",
                Errors = errorDetails,
                Requirements = new PasswordRequirements
                {
                    MinLength = 8,
                    RequireDigit = true,
                    RequireUppercase = true,
                    RequireNonAlphanumeric = true
                }
            });
        }

        private string MapErrorToField(string errorCode)
        {
            return errorCode switch
            {
                "DuplicateUserName" => "username",
                "PasswordTooShort" => "password",
                "PasswordRequiresDigit" => "password",
                "PasswordRequiresUpper" => "password",
                "PasswordRequiresNonAlphanumeric" => "password",
                _ => "general"
            };
        }

        private IActionResult HandleException(Exception ex)
        {
            return new ObjectResult(new ErrorResponse
            {
                ErrorCode = "INTERNAL_SERVER_ERROR",
                Message = "An unexpected error occurred",
                ReferenceId = Guid.NewGuid().ToString()
            })
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
        }

        #endregion
    }

    #region DTO Classes

    public class UserRegistrationDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly BirthDate { get; set; }
        public string Gender { get; set; }
    }

    public class UserLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserRegistrationResponse
    {
        public bool Success { get; set; }
        public string UserId { get; set; }
        public string Message { get; set; }
    }

    public class UserLoginResponse
    {
        public bool Success { get; set; }
        public string UserId { get; set; }
        public string Message { get; set; }
    }

    public class ErrorResponse
    {
        public string ErrorCode { get; set; }
        public string Message { get; set; }
        public string Field { get; set; }
        public IEnumerable<string> AllowedValues { get; set; }
        public IEnumerable<ErrorDetail> Errors { get; set; }
        public PasswordRequirements Requirements { get; set; }
        public string ReferenceId { get; set; }
    }

    public class ErrorDetail
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public string Field { get; set; }
    }

    public class PasswordRequirements
    {
        public int MinLength { get; set; }
        public bool RequireDigit { get; set; }
        public bool RequireUppercase { get; set; }
        public bool RequireNonAlphanumeric { get; set; }
    }

    #endregion
}