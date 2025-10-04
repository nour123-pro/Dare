using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class ProductCreateRequest
    {
        [Required(ErrorMessage = "Product Name is Required")]
        public string productname { get; set; }

        [Required(ErrorMessage = "Brand Id is Required")]
        public string brandid { get; set; }

        [Required(ErrorMessage = "Product Description is Required")]
        public string productdescription { get; set; }

        [Required(ErrorMessage = "Category Id is Required")]
        public string categoryid { get; set; }

        [Required(ErrorMessage = "Product price is Required")]
        public string productprice { get; set; } // ✅ This was missing `get; set;`

        public string[]? productingredients { get; set; }

        public string[]? ProductImages { get; set; }

        public string? productid{ get; set; }
    }
}
