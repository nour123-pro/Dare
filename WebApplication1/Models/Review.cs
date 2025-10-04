using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Review
    {
        public Guid ReviewId{ get; set; }
        [ForeignKey("AccountId")]
        public Guid AccountId{ get; set; }
        public Account Account{ get; set; }
        public string ReviewContent{ get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
        [ForeignKey("ProductId")]
        public Guid ProductId{ get; set; }
        public Product Product{ get; set; }
        public int RatingNumber { get; set; } = 0;


    }
}