using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Address
    {
        public Guid AddressId{ get; set; }
        public decimal? Longitude{ get; set; }
        public decimal? Latitude{ get; set; }
        [Required(ErrorMessage ="Country is required")]
        public Country Country{ get; set; }
        [Required(ErrorMessage ="StreetName is required")]
        public string StreetName{ get; set; }
    }
}