using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Localization;

namespace WebApplication1.Models
{
    public class Product:BaseEntity
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        [ForeignKey("BrandId")]
        public Guid BrandId { get; set; }
        public Brand Brand { get; set; }
        public string ProductDescription { get; set; }
        public bool IsDeleted { get; set; } = false;
        [ForeignKey("CategoryId")]
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
       
        public List<byte[]> ProductImages { get; set; } = new List<byte[]>();
        public enum Rating
        {
            Good = 1,
            Average = 2,
            Bad = 3
        }

        public Rating ProductRating { get; set; }
        public decimal ProductPrice { get; set; } = 233;
        public List<string>? ProductIngredients { get; set; } = new List<string>();
    }
}