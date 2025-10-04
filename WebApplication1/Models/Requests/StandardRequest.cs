using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class StandardRequest
    {
        [Required(ErrorMessage ="ID is required")]
        public string Id{ get; set; }
    }
}