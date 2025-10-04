using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models.Requests
{
    public class ProductOrderItem
    {
        [Required(ErrorMessage ="Product id is required")]
        public string ProductId { get; set; }
         [Required(ErrorMessage ="Product Quantity is required")]
        public int Quantity { get; set; }
    }

    public class OrderCreateRequest
    {
        [Required(ErrorMessage ="AccountId is Required")]
                public string AccountId { get; set; }
                 [Required(ErrorMessage ="Products are Required")]
        public List<ProductOrderItem> Products { get; set; }
         [Required(ErrorMessage ="OrderDate is  Required")]
        public DateTime OrderDate { get; set; }
        public string? Notes { get; set; }
        [Required(ErrorMessage = "Order address is required")]
        public Address OrderAddress { get; set; }
    }
}
