using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Repositories;
using WebApplication1.Models.Requests;
using Microsoft.AspNetCore.Http.HttpResults;
using Castle.Components.DictionaryAdapter.Xml;
using WebApplication1.Models;
using Microsoft.Extensions.Configuration.UserSecrets;
namespace WebApplication1.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/User")]
    public class UserApiController : ControllerBase
    {
        private readonly UserRepository _userrepo;
        private readonly AccountRepository _accountrepo;
        public UserApiController(UserRepository userRepository,AccountRepository accountRepository){
            _userrepo = userRepository;
            _accountrepo = accountRepository;
        }
        [HttpPost("Login")]
        [Produces("application/json")]
public async Task<IActionResult> Login([FromBody] LoginFormRequest loginRequest)
{
    // Validate the model
    if (!ModelState.IsValid)
    {
        return BadRequest(new { message = "Invalid data.", errors = ModelState });
    }

    var loginDto = new UserLoginDto
    {
        Username = loginRequest.username,
        Password = loginRequest.password
    };

    try
    {
        // Call to the repository to authenticate user
        var result = await _userrepo.LoginUserAsync(loginDto);

        // Check if the result is an ActionResult and handle it
        if (result is BadRequestObjectResult badRequest)
        {
            return BadRequest(new { message = (badRequest.Value as ErrorResponse)?.Message });
        }
        else if (result is NotFoundObjectResult notFound)
        {
            return NotFound(new { message = (notFound.Value as ErrorResponse)?.Message });
        }
        else if (result is UnauthorizedObjectResult unauthorized)
        {
            return Unauthorized(new { message = (unauthorized.Value as ErrorResponse)?.Message });
        }
        else if (result is OkObjectResult okObject)
                {
                   // FIX: Assign the result of the second expression to a property named UserId
return Ok(new { 
    message = (okObject.Value as UserLoginResponse)?.Message, 
    UserId = (okObject.Value as UserLoginResponse)?.UserId // <--- Corrected
});
        }
        else
        {
            return BadRequest(new { message = "Unexpected result from login process." });
        }
    }
    catch (Exception ex)
    {
        // Log the exception and return an error message
       // _logger.LogError(ex, "Error during login process.");
        return StatusCode(500, new { message = "An internal server error occurred.", error = ex.Message });
    }
}


[HttpPost("SignUp")]
[Produces("application/json")]

public async Task<IActionResult> SignUp([FromBody] SignInRequestForm signInRequestForm)
{
    // 1. Detailed Model Validation
    if (!ModelState.IsValid)
    {
        var errors = ModelState
            .Where(ms => ms.Value.Errors.Any())
            .ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );
        
        return BadRequest(new {
            message = "Validation failed - please correct the following fields",
            errors = errors,
            fieldRequirements = new {
                username = "3-20 characters, unique",
                password = "8+ chars with 1 special character and 1 number",
                birthdate = "YYYY-MM-DD format",
                gender = "Must be 'male', 'female' or 'other'"
            }
        });
    }

    // 2. Specific Date Parsing
    if (!DateOnly.TryParse(signInRequestForm.birthdate, out var birthDate))
    {
        return BadRequest(new {
            message = "Invalid birthdate format",
            requiredFormat = "YYYY-MM-DD",
            receivedValue = signInRequestForm.birthdate,
            exampleValid = new [] { "2000-01-15", "1995-12-31" }
        });
    }

    // 3. Explicit Gender Validation
    var validGenders = new [] { "male", "female", "other" };
    if (!validGenders.Contains(signInRequestForm.gender.ToLower()))
    {
        return BadRequest(new {
            message = "Invalid gender value",
            allowedValues = validGenders,
            receivedValue = signInRequestForm.gender
        });
    }

    try
    {
        var userDto = new UserRegistrationDto
        {
            Username = signInRequestForm.username,
            Password = signInRequestForm.password,
            FirstName = signInRequestForm.firstname,
            LastName = signInRequestForm.lastname,
            BirthDate = birthDate,
            Gender = signInRequestForm.gender
        };

        var result = await _userrepo.RegisterUserAsync(userDto);
        
        // 4. Comprehensive Response Handling
        return result switch
        {
            OkObjectResult ok => Ok(new {
                success = true,
                message = "Registration successful",
                userId = ok.Value // Assuming your repo returns the user ID
            }),

            BadRequestObjectResult br when br.Value is IEnumerable<IdentityError> identityErrors => 
                BadRequest(new {
                    message = "Account requirements not met",
                    specificErrors = identityErrors.Select(e => new {
                        code = e.Code,
                        description = e.Description
                    }),
                    passwordRules = new {
                        minLength = 8,
                        requireDigit = true,
                        requireUppercase = true,
                        requireSpecialChar = true
                    }
                }),

            BadRequestObjectResult br => 
                BadRequest(new {
                    message = "Registration rejected",
                    details = br.Value.ToString()
                }),

            ObjectResult obj when obj.StatusCode >= 400 => 
                StatusCode(obj.StatusCode.Value, new {
                    message = "Registration service reported an error",
                    statusCode = obj.StatusCode,
                    details = obj.Value
                }),

            _ => StatusCode(500, new {
                message = "Unrecognized response from registration service",
                responseType = result?.GetType().Name,
                debugInfo = "The _userrepo.SignIn method returned an unexpected result type",
                supportContact = "support@yourapp.com"
            })
        };
    }
    catch (Exception ex)
    {
        // 5. Detailed Error Reporting
        return StatusCode(500, new {
            message = "Registration failed due to server error",
            errorType = ex.GetType().Name,
            errorDetails = ex.Message,
            
            supportReference = Guid.NewGuid().ToString()
        });
    }
}
    
       [HttpGet("GetAccounts")]
    public async Task<IActionResult> GetAccounts(){
           IEnumerable<User> users=await _userrepo.GetAllAysc();
            IEnumerable<AccountWithPurchaseCountDto> accounts = await _accountrepo.GetAccountsWithPurchaseCounts();
            return Ok(accounts);
        }
    
    
    
    
    }

 
}