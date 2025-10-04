using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class BrandCreateRequest
    {
        [Required(ErrorMessage ="Brand names is required")]
        public string BrandName{ get; set; }
        [Required(ErrorMessage ="Brand Description is required")]
        public string BrandDescription{ get; set; }
        public string[]? BrandImage{ get; set; }
        public string? BrandId{ get; set; }
    }
}