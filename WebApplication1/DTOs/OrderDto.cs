using Microsoft.CodeAnalysis;
using WebApplication1.Models;
namespace WebApplication1.DTOs
{
    public class OrderDto
    {
          public Guid OrderId{ get; set; }
        public Guid AccountId{ get; set; }
        public DateTime CreatedAt{ get; set; }
        public DateTime ExpectedDelievery{ get; set; }
        public Address OrderAddress{ get; set; }
        public bool IsDeleted{ get; set; }
        public bool IsDelievered{ get; set; }
        public  decimal  TotalOrderPrice{ get; set; }
        public Gender gender{ get; set; }
        public bool isAccepted{ get; set; }
        public ICollection<OrderProductDto> OrderProducts { get; set; }
        public string Notes{ get; set; }
    }
}
public enum Gender{
    Female,
    Male
}