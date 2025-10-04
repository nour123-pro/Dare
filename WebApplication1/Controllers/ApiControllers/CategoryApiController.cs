using Microsoft.AspNetCore.Mvc;
using WebApplication1.Repositories;
using WebApplication1.Models.Requests;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebApplication1.Models;
namespace WebApplication1.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/Category")]
    public class CategoryApiController : ControllerBase
    {
        private readonly CategoryRepository _catrepos;
        public CategoryApiController(CategoryRepository categoryRepository)
        {
            _catrepos = categoryRepository;
        }

        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var reponse = await _catrepos.GetValid();;
            return Ok(reponse);
        }
        [HttpPost("SaveCategory")]

       public async Task<IActionResult> SaveCategory([FromBody] SaveCategoryRequest saveCategoryRequest)
{
    // Validate model state and return early if invalid
    if (!ModelState.IsValid)
    {
        var errors = ModelState.Values
            .SelectMany(v => v.Errors)
            .Select(e => e.ErrorMessage)
            .ToList();

        return BadRequest(new { message = "Validation failed", errors });
    }

    try
    {
        var decodedImage = new byte[0];

        if (saveCategoryRequest.categoryimages != null && saveCategoryRequest.categoryimages.Length > 0)
        {
            try
            {
                // Join all base64 strings and decode once
                string combinedBase64 = string.Join("", saveCategoryRequest.categoryimages);
                decodedImage = Convert.FromBase64String(combinedBase64);
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "Invalid base64 image format" });
            }
        }

        if (!string.IsNullOrWhiteSpace(saveCategoryRequest.categoryid) &&
            Guid.TryParse(saveCategoryRequest.categoryid, out Guid categid))
        {
            // Editing existing category
            var existingCategory = await _catrepos.GetByIdAysnc2(categid);
            if (existingCategory == null)
            {
                return NotFound(new { message = "Category not found" });
            }

            existingCategory.CategoryName = saveCategoryRequest.categoryname;
            existingCategory.CategoryColor = saveCategoryRequest.categorycolor ?? "#ffff";
            if (decodedImage.Length > 0)
            {
                existingCategory.CategoryImage = decodedImage;
            }

            await _catrepos.UpdateAsync(existingCategory);

            return Ok(new { message = "Successfully Updated Category" });
        }
        else
        {
            // Creating new category
            var category = new Category
            {
                CategoryName = saveCategoryRequest.categoryname,
                CategoryColor = saveCategoryRequest.categorycolor ?? "#ffff",
                CategoryImage = decodedImage,
                CreatedAt = DateTime.UtcNow
            };

            await _catrepos.AddAsync(category);

            return Ok(new { message = "Successfully Created Category" });
        }
    }
    catch (Exception ex)
    {
        // Log the exception here if you have a logger, e.g. _logger.LogError(ex, "Error saving category");
        return StatusCode(500, new { message = "Internal server error", detail = ex.Message });
    }
}







      [HttpPost("DeleteCategory")]
      public async Task<IActionResult> DeleteCategory([FromBody] StandardRequest standardRequest){
        if(!ModelState.IsValid){
                return BadRequest(new{message="Invalid Model Format"});
            }

         if(standardRequest.Id==null || Guid.TryParse(standardRequest.Id,out Guid id)==false){
                return BadRequest(new { message = "Invalid Guid Format" });

            }

            var ishere = await _catrepos.GetByIdAysnc2(id);
            if(ishere==null){
                return NotFound();
            }
            ishere.isDeleted = true;
            await _catrepos.UpdateAsync(ishere);
            return Ok(new{message="Success",success=true});
        }



    }
}