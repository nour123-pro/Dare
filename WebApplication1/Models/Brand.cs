namespace WebApplication1.Models
{
    public class Brand
    {
        public Guid BrandId{ get; set; }
        public string BrandName{ get; set; }
        public string BrandDescription{ get; set; }
        public byte[] BrandImage{ get; set; } 
        public bool IsDeleted{ get; set; }
        public DateTime CreatedAt{ get; set; }
    }
}