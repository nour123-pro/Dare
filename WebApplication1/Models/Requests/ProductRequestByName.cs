using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class ProductRequestByName
    {
        [Required(ErrorMessage ="Product Name is required")]
        public string productname;
    }
}