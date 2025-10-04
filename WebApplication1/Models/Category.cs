namespace WebApplication1.Models
{
    public class Category
    {
        public Guid CategoryId{ get; set; }
        public string CategoryName{ get; set; }
        public byte[]? CategoryImage { get; set; } = Array.Empty<byte>();
        public string CategoryColor{ get; set; }
        public DateTime CreatedAt{ get; set; }
        public bool isDeleted { get; set; } = false;
    }
}