using System.Threading.Tasks;
using Azure.Storage.Blobs.Models;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class CategoryRepository:GenricRepository<Category>
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context):base(context){
            _context = context;
        }

        public async Task<List<Category>> GetValid(){
            var data = await _context.Categories.Where(c => c.isDeleted == false).ToListAsync();
            return data;
        }

        public Category GetById2(Guid Id)
        {

            var ishere = _context.Categories.FirstOrDefault(c => c.CategoryId == Id);
            return ishere;
        }
    }
}