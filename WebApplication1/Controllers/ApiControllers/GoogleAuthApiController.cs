using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using WebApplication1.Repositories;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;
    private readonly AccountRepository _accountRepository;

    public AuthController(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        IConfiguration configuration,
        ILogger<AuthController> logger,
        AccountRepository accountRepository)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _logger = logger;
        _accountRepository = accountRepository;

    }

    [HttpPost("GoogleAuth")]
    public async Task<IActionResult> GoogleAuth([FromBody] GoogleTokenRequest request)
    {
        _logger.LogInformation("Google authentication attempt started.");

        if (request == null || string.IsNullOrEmpty(request.token))
        {
            return BadRequest(new ErrorResponse
            {
                Success = false,
                ErrorCode = "INVALID_REQUEST",
                Message = "Token is required"
            });
        }

        try
        {
            // Validate Google token
            var payload = await ValidateGoogleToken(request.token);
            if (payload == null)
            {
                return BadRequest(new ErrorResponse
                {
                    Success = false,
                    ErrorCode = "INVALID_TOKEN",
                    Message = "Invalid Google token"
                });
            }

            // Find existing user by email
            var user = await _userManager.FindByEmailAsync(payload.Email);

            if (user == null)
            {
                // User doesn't exist, proceed with SignUp
                return await HandleSignUp(payload);
            }
            else
            {
                // User exists, proceed with Login
                return await HandleLogin(user);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during Google authentication");
            return StatusCode(500, new ErrorResponse
            {
                Success = false,
                ErrorCode = "SERVER_ERROR",
                Message = "An error occurred during authentication",
                Details = ex.Message
            });
        }
    }

    private async Task<GoogleJsonWebSignature.Payload> ValidateGoogleToken(string token)
    {
        try
        {
            var clientId = _configuration["Authentication:Google:ClientId"];
            if (string.IsNullOrEmpty(clientId))
            {
                throw new Exception("Google ClientId not configured");
            }

            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new List<string> { clientId },
                ExpirationTimeClockTolerance = TimeSpan.FromMinutes(5)
            };

            return await GoogleJsonWebSignature.ValidateAsync(token, settings);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Google token validation failed");
            return null;
        }
    }

    private async Task<IActionResult> HandleSignUp(GoogleJsonWebSignature.Payload payload)
    {
        var newUser = new User
        {
            UserName = payload.Email,
            Email = payload.Email,
            EmailConfirmed = true,
            FirstName = payload.GivenName ?? "Unknown",
            LastName = payload.FamilyName ?? "User",
            BirthDate = DateOnly.FromDateTime(DateTime.UtcNow.AddYears(-18)), // You can customize logic to extract actual birth date if available
            gender = WebApplication1.Models.User.Gender.Female, // You may add logic for gender if available
            CreatedAt = DateTime.UtcNow
        };
        
        var result = await _userManager.CreateAsync(newUser);
        if (!result.Succeeded)
        {
            return BadRequest(new ErrorResponse
            {
                Success = false,
                ErrorCode = "CREATE_FAILED",
                Message = "User creation failed",
                Details = string.Join(", ", result.Errors.Select(e => e.Description))
            });
        }

          var account = new Account
    {
        AccountId = Guid.NewGuid(),
        AccountName = newUser.FirstName,
        UserId = newUser.Id,              
        CreatedAt = DateTime.UtcNow,
        IsDeleted = false
    };

        await _accountRepository.AddAsync(account);

        // Return response after successful sign-up
        return await GenerateAuthResponse(newUser, true);
    }

    private async Task<IActionResult> HandleLogin(User user)
    {
        // Sign in the existing user
        await _signInManager.SignInAsync(user, isPersistent: false);

        return await GenerateAuthResponse(user, false);
    }

    private async Task<IActionResult> GenerateAuthResponse(User user, bool isNewUser)
    {
        var token = GenerateJwtToken(user);

        return Ok(new AuthResponse
        {
            Success = true,
            Token = token,
            IsNewUser = isNewUser,
            User = new UserDto
            {
                Id = user.Id.ToString(),
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate,
                Gender = user.gender.ToString()
            }
        });
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.UserName)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddHours(3);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// DTO Classes
public class GoogleTokenRequest
{
    [Required]
    [JsonPropertyName("token")]
    public string token { get; set; }
}

public class AuthResponse
{
    public bool Success { get; set; }
    public string Token { get; set; }
    public bool IsNewUser { get; set; }
    public UserDto User { get; set; }
}

public class UserDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateOnly? BirthDate { get; set; }
    public string Gender { get; set; }
}

public class ErrorResponse
{
    public bool Success { get; set; }
    public string ErrorCode { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }
}
