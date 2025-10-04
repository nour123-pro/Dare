namespace WebApplication1.DTOs
{
    public class OrderProductDto
    {
          public Guid OrderProductId { get; set; }
       
        public Guid ProductId{ get; set; }

        // 🎯 NEW: Attributes pulled from the nested Product entity
        public string ProductName { get; set; }
        public decimal ProductUnitPrice { get; set; }
        public string ProductCategoryName { get; set; } // Example: pull Category Name
        public string ProductBrandName { get; set; }   // Example: pull Brand Name
        // ------------------------------------------
        public int Quantity{ get; set; }
        public decimal TotalPrice{ get; set; }
    }
}