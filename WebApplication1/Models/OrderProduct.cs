using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class OrderProduct
    {
        public Guid OrderProductId { get; set; }
        [ForeignKey("ProductId")]
        public Guid ProductId{ get; set; }
        public Product Product{ get; set; }
[ForeignKey("OrderId")]
        public Guid OrderId{ get; set; }
        
        public Order Order{ get; set; }

        public int Quantity{ get; set; }
        public decimal TotalPrice{ get; set; }


    }
}