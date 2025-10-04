using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class LoginFormRequest
    {
        [Required(ErrorMessage ="Username is required")]
        public  string  username{ get; set; }
        [Required(ErrorMessage ="Password is required")]
        public  string password{ get; set; }
    }
}