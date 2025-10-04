using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApplication1.Models;
using WebApplication1.Models.Requests;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/Review")]
    public class ReviewApiController : ControllerBase
    {
        private readonly ReviewRepository _reviewrepo;
        private readonly AccountRepository _accountrepo;
        private readonly ProductRepository _productrepo;
        public ReviewApiController(ReviewRepository reviewrepo, AccountRepository accountrepo,ProductRepository productRepository)
        {
            _reviewrepo = reviewrepo;
            _accountrepo = accountrepo;
            _productrepo = productRepository;
        }

        [HttpGet("AllReviews")]
        public async Task<IActionResult> GetAllResults()
        {
            var result = await _reviewrepo.GetAllAysc();
            return Ok(result);
        }

        [HttpPost("SendReview")]
         public async Task<IActionResult> SendReview([FromBody] SendReviewRequest sendReviewRequest)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(new { message = ModelState });
    }

    // Check if username is provided and find account
    if (sendReviewRequest.username != null)
    {
        Account account1 = await _accountrepo.GetAccountByAccountNameAsync(sendReviewRequest.username);
        if (account1 == null)
        {
            return BadRequest(new { message = "Account not found" });
        }

        // Validate the product ID
        if (!Guid.TryParse(sendReviewRequest.productid, out Guid productId))
        {
            return BadRequest(new { message = "Invalid product ID format" });
        }

                // Optionally: Check if the product exists in your database (if necessary)
                var product = await _productrepo.GetByIdAysnc2(productId);
                if (product == null)
        {
            return BadRequest(new { message = "Product not found" });
        }

        // Create a new review
        Review review = new Review
        {
            ReviewContent = sendReviewRequest.reviewcontent,
            AccountId = account1.AccountId,
            ProductId = productId , // Assign the valid product ID to the review
            RatingNumber=int.Parse(sendReviewRequest.ratingnumber)
        };

        try
        {
            // Add the review to the repository
            await _reviewrepo.AddAsync(review);
            return Ok(new { success = true, message = "Thank you for your review" });
        }
        catch (Exception error)
        {
            return BadRequest(new { message = error.Message });
        }
    }

    return BadRequest(new { message = "Username cannot be null" });
}

        [HttpPost("GetReviewForProduct")]
        public async Task<IActionResult> GetReviewsForProduct([FromBody] ProductReviewsRequest productReviewsRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            var result = await _reviewrepo.GetProductReviews(Guid.Parse(productReviewsRequest.productid));

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }


        [HttpGet("ReviewAll")]
        public async Task<IActionResult> AllReviews2()
        {
            var response = await _reviewrepo.GetReviewsFull();
            return Ok(response);
        }
        



      [HttpPost("EditingReview")]
      public async Task<IActionResult> EditingReview([FromBody] ReviewUpdateRequest review){
        if(!ModelState.IsValid){
                return BadRequest(new { message = ModelState });
            }

            //convert
            var reviewanted = await _reviewrepo.GetByIdAysnc2(review.ReviewId);
            if(reviewanted==null){
                return NotFound(new { message = "Unable to find the review wanted" });
            }
            reviewanted.ReviewContent = review.ReviewContent;
            reviewanted.RatingNumber = review.RatingNumber;

            await _reviewrepo.UpdateAsync(reviewanted);
            return Ok(new { message = "Review Editing is Succesfull" });

        }

    }
}


