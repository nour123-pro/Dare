using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class SignInRequestForm
    {
      [Required(ErrorMessage = "Gender is required.")]
      public string gender { get; set; }

      [Required(ErrorMessage = "First name is required.")]
      public string firstname { get; set; }

      [Required(ErrorMessage = "Last name is required.")]
      public string lastname { get; set; }

      [Required(ErrorMessage = "Birthdate is required.")]
      public string birthdate { get; set; }

      [Required(ErrorMessage = "Username is required.")]
      public string username { get; set; }

      [Required(ErrorMessage = "Password is required.")]
      public string password { get; set; }
    }
}