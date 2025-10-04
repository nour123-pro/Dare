using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Country
    {

        public Guid CountryId{ get; set; }
        [Required(ErrorMessage ="CountryName is Required")]
        public string CountryName{ get; set; }
        public string? City{ get; set; }
        
    }
}