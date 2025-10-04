using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class WishListProduct
    {
      public Guid WishListProductId{ get; set; }
      [ForeignKey("ProductId")]
      public Guid ProductId{ get; set; }
      public Product Product{ get; set; }
      [ForeignKey("AccountId")]
      public Guid AccountId{ get; set; }
      public Account Account{ get; set; }
      public DateTime CreatedAt{ get; set; }
      public bool IsDeleted{ get; set; }

    }
}