using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class WishListProductRepository:GenricRepository<WishListProduct>
    {
        public WishListProductRepository(ApplicationDbContext context):base(context){
            
        }
    }
}