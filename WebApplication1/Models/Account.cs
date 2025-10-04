using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Account
    {
        
        public Guid AccountId{ get; set; }
        public string AccountName{ get; set; }
        public byte[]? AccountProfile{ get; set; }
        public bool IsDeleted{ get; set; }
        [ForeignKey("UserId")]
        public Guid UserId{ get; set; }
        public User User{ get; set; }
        public DateTime CreatedAt{ get; set; }

    }
}