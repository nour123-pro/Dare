using WebApplication1.Models;
using WebApplication1.Repositories;
using WebApplication1.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
namespace WebApplication1.Repositories
{
    public class ProductRepository : GenricRepository<Product>
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IActionResult> GetProductByName(string productname){
            try
            {
                 if(productname==null){
                 return new BadRequestObjectResult(new ErrorResponse
                    {
                        ErrorCode = "INVALID_INPUT",
                        Message = "Username and password are required"
                    });
            }
            var data = _context.Products.FirstOrDefault(product => product.ProductName.Equals(productname));
            if(data==null){
                return new NotFoundObjectResult(new ErrorResponse
                    {
                        ErrorCode = "USER_NOT_FOUND",
                        Message = "User not found"
                    });
            }
            return new OkObjectResult(data);
            }
            catch (Exception error)
            {

                return new BadRequestObjectResult(error);
            }
           
        }

        public async Task SoftDelete(Guid productid){
            var product = _context.Products.FirstOrDefault(pr => pr.ProductId == productid);
            if(product!=null){
                product.IsDeleted = true;
                await  _context.SaveChangesAsync();
            }
        
            
        }
        

    }
}