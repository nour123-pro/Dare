using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class ReviewRepository:GenricRepository<Review>
    {
        private readonly ApplicationDbContext _context;
        public ReviewRepository(ApplicationDbContext context):base(context){
            _context = context;
        }

        //get products ReviewRepository
         public async Task<List<Review>> GetProductReviews(Guid productid){
            //check if product exist
            var product = await _context.Products.FirstOrDefaultAsync(pr => pr.ProductId == productid);
              
            if(product==null){
                return [];
            }
            var reviews = await _context.Reviews.Where(r => r.ProductId == productid).ToListAsync();
            return reviews;

        }

        //get revirews 
        public async Task<List<Review>> GetReviewsFull(){
            var reviews = await _context.Reviews.Include(re => re.Account ).Include(re=>re.Product).Include(re=>re.Product.Brand).ToListAsync();
            return reviews;
        }


        

    }
}