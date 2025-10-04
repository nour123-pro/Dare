using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class BrandRequest
    {
        [Required(ErrorMessage ="Brand Id is Required")]
        public string brandid{ get; set; }
    }
}