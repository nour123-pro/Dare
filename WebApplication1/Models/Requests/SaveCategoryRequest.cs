using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class SaveCategoryRequest
    {
        public string? categoryid{ get; set; }
        public string[]? categoryimages { get; set; }
        public string? categorycolor{ get; set; }
        [Required(ErrorMessage ="Category Name is required")]
        public string categoryname{ get; set; }


    }
}