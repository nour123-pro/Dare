using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Order
    {
        public Guid OrderId{ get; set; }
        [ForeignKey("AccountId")]
        public Guid AccountId{ get; set; }
        public Account account{ get; set; }
        public DateTime CreatedAt{ get; set; }
        public DateTime ExpectedDelievery{ get; set; }
        public Address OrderAddress{ get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsDelievered { get; set; } = false;
        public  decimal  TotalOrderPrice{ get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
        public string Notes{ get; set; }

        public bool isAccepted { get; set; } = true;
    }
}