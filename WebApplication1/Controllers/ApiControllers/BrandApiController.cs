using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.OpenApi.Any;
using WebApplication1.Models;
using WebApplication1.Models.Requests;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/Brand")]
    public class BrandApiController : ControllerBase
    {

        private readonly BrandRepository _brandrepo;


        public BrandApiController(BrandRepository brandrepo)
        {
            _brandrepo = brandrepo;
        }
        [HttpGet("AllBrands")]

        public async Task<IActionResult> GetBrands()
        {
            var response = await _brandrepo.GetAllAysc();
            return Ok(response);
        }

        [HttpPost("GetBrandById")]
        public async Task<IActionResult> GetBrandById([FromBody] BrandRequest brandRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            if (!Guid.TryParse(brandRequest.brandid, out var brandId))

            {
                return BadRequest(new { message = "Invalid brand id format" });
            }
            var reponse = await _brandrepo.GetByIdAysnc2(brandId);
            return Ok(reponse);
        }
        
        [HttpPost("CreateOrUpdateBrand")]
        
   public async Task<IActionResult> HandleCreateOrUpdate([FromBody] BrandCreateRequest brandCreateRequest)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(new { message = ModelState });
    }

    // Convert Base64 strings to byte arrays
    List<byte[]> imageBytesList = new();
    if (brandCreateRequest.BrandImage != null && brandCreateRequest.BrandImage.Length > 0)
    {
        foreach (var base64Image in brandCreateRequest.BrandImage)
        {
            try
            {
                var imageBytes = Convert.FromBase64String(base64Image);
                imageBytesList.Add(imageBytes);
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "One or more images have invalid base64 format" });
            }
        }
    }

    if (!string.IsNullOrEmpty(brandCreateRequest.BrandId) && Guid.TryParse(brandCreateRequest.BrandId, out var brandId))
    {
        var existingBrand = await _brandrepo.GetByIdAysnc2(brandId);
        if (existingBrand == null)
        {
            return NotFound(new { message = "Brand not found" });
        }

        existingBrand.BrandName = brandCreateRequest.BrandName;
        existingBrand.BrandDescription = brandCreateRequest.BrandDescription;

        // ✅ Assign all images (not just the first)
        if (imageBytesList.Any())
        {
            existingBrand.BrandImage = imageBytesList[0];
        }

        await _brandrepo.UpdateAsync(existingBrand);
        return Ok(new { message = "Brand Updated Successfully" });
    }
    else
    {
        var brand = new Brand
        {
            BrandName = brandCreateRequest.BrandName,
            BrandDescription = brandCreateRequest.BrandDescription,
            BrandImage = imageBytesList[0], // ✅ Use full image list
            CreatedAt = DateTime.Today
        };

        await _brandrepo.AddAsync(brand);
        return Ok(new { message = "Brand Created Successfully" });
    }
}

        [HttpPost("Delete")]
        public async Task<IActionResult> HandleDelete([FromBody] BrandRequest brandRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { messsage = ModelState });
            }
            if (!Guid.TryParse(brandRequest.brandid, out Guid brandId))
            {
                return BadRequest(new { message = "Invalid Guid format" });



            }
            Brand brand = await _brandrepo.GetByIdAysnc2(brandId);
            if (brand == null)
            {
                return NotFound(new { message = "Brand not found" });
            }

            brand.IsDeleted = true;

            await _brandrepo.UpdateAsync(brand);

            return Ok(new { message = "Brand Deleted Successfully" });
        }


    }
}