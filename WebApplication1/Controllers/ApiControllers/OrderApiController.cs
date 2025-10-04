using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using WebApplication1.Models;
using WebApplication1.Models.Requests;
using WebApplication1.Repositories;
using AutoMapper;
using WebApplication1.DTOs;
namespace WebApplication1.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/Order")]
    public class OrderApiController:ControllerBase
    {
        private readonly OrderRepository _orderrep;
        private readonly IMapper _mapper;
        private readonly ProductRepository _productrep;
        public OrderApiController(OrderRepository orderRepository,ProductRepository productRepository,IMapper mapper){
            _orderrep = orderRepository;
            _productrep = productRepository;
             _mapper = mapper;
        }
        

        [HttpGet("AllOrders")]
        public async Task<IActionResult> GetAllOrders(){
           var orders = await _orderrep.GetOrders(); 

        // 2. Map the list of entities (Order) to a list of DTOs (OrderDto)
        var orderDtos = _mapper.Map<List<OrderDto>>(orders); 

        // 3. Return the safe DTOs to the client
        return Ok(orderDtos); 
        }

     // Controller:
     [HttpPost("CreateOrder")]
public async Task<IActionResult> HandleCreateOrder([FromBody] OrderCreateRequest orderCreateRequest)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(new { message = ModelState });
    }

    // Validate AccountId is a valid GUID
    if (!Guid.TryParse(orderCreateRequest.AccountId, out var accountId))
    {
        return BadRequest(new { message = "Invalid AccountId GUID format." });
    }

    // Validate Products list is not empty
    if (orderCreateRequest.Products == null || !orderCreateRequest.Products.Any())
    {
        return BadRequest(new { message = "Products list cannot be empty." });
    }

    // Validate each product in Products list
    foreach (var pr in orderCreateRequest.Products)
    {
        if (string.IsNullOrWhiteSpace(pr.ProductId) || !Guid.TryParse(pr.ProductId, out var productId))
            return BadRequest(new { message = $"Invalid GUID format for ProductId: '{pr.ProductId}'" });

        var product = await _productrep.GetByIdAysnc2(productId);
        if (product == null)
            return NotFound(new { message = $"Product with ID {productId} not found." });

        if (pr.Quantity <= 0)
            return BadRequest(new { message = $"Product quantity must be greater than zero for ProductId {productId}." });
    }

    // Validate OrderDate is not default and not in the past (optional, depends on your business logic)
    if (orderCreateRequest.OrderDate == default)
    {
        return BadRequest(new { message = "OrderDate must be provided." });
    }
    else if (orderCreateRequest.OrderDate < DateTime.UtcNow.AddDays(-1)) // for example, no orders in the past more than 1 day
    {
        return BadRequest(new { message = "OrderDate cannot be in the distant past." });
    }

    // Validate OrderAddress is not null and required fields
    if (orderCreateRequest.OrderAddress == null)
    {
        return BadRequest(new { message = "OrderAddress is required." });
    }
    else
    {
        if (string.IsNullOrWhiteSpace(orderCreateRequest.OrderAddress.StreetName))
            return BadRequest(new { message = "StreetName in OrderAddress is required." });

        if (orderCreateRequest.OrderAddress.Country == null)
            return BadRequest(new { message = "Country in OrderAddress is required." });

      

        if (string.IsNullOrWhiteSpace(orderCreateRequest.OrderAddress.Country.CountryName))
            return BadRequest(new { message = "CountryName in Country is required." });
    }

    // If all validations pass, proceed to create the order
    await _orderrep.HandleOrderCreation(orderCreateRequest);

    return Ok(new { message = "Order created successfully" });
}





[HttpPost("CancelOrder")]
public async Task<IActionResult> CancelOrder([FromBody] StandardRequest standardRequest){
    if(!ModelState.IsValid){
                return BadRequest();
            }
     if(standardRequest.Id==null|| !Guid.TryParse(standardRequest.Id,out Guid OrderId)){
                return BadRequest(new { message = "Invalid Guid Format" });
            }

            var orderselected = await _orderrep.GetByIdAysnc2(OrderId);
            if(orderselected==null||orderselected.IsDelievered==true){
                return BadRequest(new { message = "Canceling Order Failed" });
            }
            orderselected.isAccepted = false;
            await _orderrep.UpdateAsync(orderselected);
            return Ok(new { message = "successfully Canceled the Order", success = true });

        }




[HttpPost("ConfirmOrder")]
public async Task<IActionResult> ConfirmOrder([FromBody] StandardRequest standardRequest){
     if(!ModelState.IsValid){
                return BadRequest();
            }
     if(standardRequest.Id==null|| !Guid.TryParse(standardRequest.Id,out Guid OrderId)){
                return BadRequest(new { message = "Invalid Guid Format" });
            }

            var orderselected = await _orderrep.GetByIdAysnc2(OrderId);
            if(orderselected==null||orderselected.IsDelievered==true){
                return BadRequest(new { message = "Canceling Order Failed" });
            }
            orderselected.isAccepted = true;
            await _orderrep.UpdateAsync(orderselected);
            return Ok(new { message = "successfully Confirmed the Order", success = true });
}





[HttpPost("ConfirmOrderDelivery")]
public async Task<IActionResult> ConfirmOrderDelivery([FromBody] StandardRequest standardRequest){
      if(!ModelState.IsValid){
                return BadRequest();
            }
     if(standardRequest.Id==null|| !Guid.TryParse(standardRequest.Id,out Guid OrderId)){
                return BadRequest(new { message = "Invalid Guid Format" });
            }

            var orderselected = await _orderrep.GetByIdAysnc2(OrderId);
            if(orderselected==null||orderselected.IsDelievered==true){
                return BadRequest(new { message = "Canceling Order Failed" });
            }
            orderselected.IsDelievered = true;
            await _orderrep.UpdateAsync(orderselected);
            return Ok(new { message = "successfully Delievered the Order", success = true });
}
    }
}