using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class ProductReviewsRequest
    {
        [Required(ErrorMessage ="Product id is required")]
        public string productid{ get; set; }

    }
}