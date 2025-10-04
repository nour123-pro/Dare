using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class AddressRepository:GenricRepository<Address>
    {
        public AddressRepository(ApplicationDbContext context):base(context){
            
        }
    }
}