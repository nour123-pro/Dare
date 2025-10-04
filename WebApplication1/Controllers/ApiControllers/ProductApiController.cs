using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Repositories;
using WebApplication1.Models.Requests;
using System.Net.NetworkInformation;
using Azure.Core;
namespace WebApplication1.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/Product")]
    public class ProductApiController:ControllerBase
    {
        private readonly ProductRepository _productRepos;
        public ProductApiController(ProductRepository pr)
        {
            _productRepos = pr;
        }

        [HttpPost("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            IEnumerable<Product> productsdata = await _productRepos.GetAllAsync2();
            return Ok(productsdata);
        }

        [HttpPost("GetProductById")]
        public async Task<IActionResult> GetProductById([FromBody] ProductRequestById productRRequestById  ){
            var data = await _productRepos.GetByIdAysnc2(Guid.Parse(productRRequestById.productid));
            if(data!=null && data is Product){
                return Ok(new { data = data, message = "found product" });
            }
            return NotFound(new { message = "Product not found in database" });
        }
        [HttpPost("GetProductByName")]
        public async Task<IActionResult> GetProductByName([FromBody] ProductRequestByName productRequestByName){
            if(!ModelState.IsValid){
                return BadRequest(new { message = ModelState });
            }
            var data = await _productRepos.GetProductByName(productRequestByName.productname);
            if(data is BadRequestObjectResult bs){
                return BadRequest(new { message = bs.Value });
            }
            if(data is NotFoundObjectResult notfound){
                return NotFound(new { message = notfound.Value });
            }
            return Ok(new { message = data });
        }

    [HttpPost("SaveProduct")]
public async Task<IActionResult> SaveProduct([FromBody] ProductCreateRequest productCreateRequest)
{
    if (!ModelState.IsValid)
     return BadRequest(new { message = "Validation failed", errors = ModelState });

    if (!Guid.TryParse(productCreateRequest.brandid, out var brandid) ||
     !Guid.TryParse(productCreateRequest.categoryid, out var categoryId))
    {
     return BadRequest(new { message = "Invalid Brand or Category ID format" });
    }

    try
    {
     var newProduct = new Product
     {
         ProductName = productCreateRequest.productname,
         ProductDescription = productCreateRequest.productdescription,
         BrandId = brandid,
         CategoryId = categoryId,
         ProductImages = new List<byte[]>(),
         ProductPrice = decimal.Parse(productCreateRequest.productprice),
         ProductIngredients = productCreateRequest.productingredients != null ? productCreateRequest.productingredients.ToList() : new List<string>()
     };

     if (productCreateRequest.ProductImages != null && productCreateRequest.ProductImages.Length > 0)
     {
         foreach (var base64Image in productCreateRequest.ProductImages)
         {
          try
          {
              byte[] imageBytes = Convert.FromBase64String(base64Image);
              newProduct.ProductImages.Add(imageBytes);
          }
          catch (FormatException)
          {
              return BadRequest(new { message = "One or more images have invalid base64 format" });
          }
         }
     }

     if (!string.IsNullOrEmpty(productCreateRequest.productid) && Guid.TryParse(productCreateRequest.productid, out var productId))
     {
         newProduct.ProductId = productId;
         await _productRepos.UpdateAsync(newProduct);
         return Ok(new { message = "Product updated successfully" });
     }
     else
     {
         await _productRepos.AddAsync(newProduct);
         return Ok(new { message = "Product added successfully" });
     }
    }
    catch (Exception ex)
    {
     return BadRequest(new { message = ex.Message });
    }
}

       
       
       
       [HttpPost("DeleteProduct")]
        public async Task<IActionResult> SoftDeleteProduct([FromBody] ProductRequestById productRRequestById){
            if(!ModelState.IsValid){
                return BadRequest(new { message = ModelState });
            }
            if(!Guid.TryParse(productRRequestById.productid ,out  Guid productid)){
                return BadRequest(new { message = "Failure in Parsing Guid Id format" });
            }
            
            var product = await _productRepos.GetByIdAysnc2(productid);
            if(product==null){
                return NotFound(new { message = "Deletion Failed,Unfound item", success = false });
            }
                await _productRepos.SoftDelete(Guid.Parse(productRRequestById.productid));
            return Ok(new { message = "Successfully Deleted Product", success = true });

        }


       

    }
}