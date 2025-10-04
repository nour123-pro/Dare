using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class BrandRepository:GenricRepository<Brand>
    {
        public BrandRepository(ApplicationDbContext context):base(context){
            
        }
    }
}