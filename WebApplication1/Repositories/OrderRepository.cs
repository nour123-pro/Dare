using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Models.Requests;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Http.HttpResults;

namespace WebApplication1.Repositories
{
    public class OrderRepository : GenricRepository<Order>
    {
        private readonly ApplicationDbContext _context;
        private readonly CountryRepository _countryrepo;
        private readonly AccountRepository _accountrep;
        private readonly ProductRepository _productRepository;  // Inject this for product lookups

        public OrderRepository(ApplicationDbContext context, ProductRepository productRepository,AccountRepository accountRepository,CountryRepository countryRepository) : base(context)
        {
            _context = context;
            _productRepository = productRepository;
            _accountrep = accountRepository;
            _countryrepo = countryRepository;
        }

        public async Task<List<Order>> GetOrders()
        {
            
            return await _context.Orders
                .Include(or => or.OrderAddress)
                .Include(or => or.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToListAsync();
        }
       public async Task HandleOrderCreation(OrderCreateRequest orderCreateRequest)
{
    if (orderCreateRequest == null)
    {
        Console.WriteLine("order is null");
        return;
    }

    // --- CRITICAL NULL CHECKS ---
    // Check if the Address object is null
    if (orderCreateRequest.OrderAddress == null)
    {
        throw new ArgumentNullException(nameof(orderCreateRequest.OrderAddress), "Order address data is required.");
    }
    
    // Check if the nested Country object is null
    if (orderCreateRequest.OrderAddress.Country == null)
    {
        throw new ArgumentNullException(nameof(orderCreateRequest.OrderAddress.Country), "Order address must include Country details.");
    }
    
    // Check if the Products collection is null or empty
    if (orderCreateRequest.Products == null || !orderCreateRequest.Products.Any())
    {
        throw new ArgumentException("Order must contain at least one product.", nameof(orderCreateRequest.Products));
    }
    // ----------------------------


    // STEP 1: Handle country
    // The previous checks ensure OrderAddress.Country is non-null
    Country country = _countryrepo.GetCountryByName(orderCreateRequest.OrderAddress.Country.CountryName);

    if (country == null)
    {
        country = new Country
        {
            CountryId = Guid.NewGuid(), // Or let EF generate
            CountryName = orderCreateRequest.OrderAddress.Country.CountryName,
            // Safely accessing City, which might be optional in the incoming Address model
            City = orderCreateRequest.OrderAddress.Country.City 
        };

        await _context.Countries.AddAsync(country);
        await _context.SaveChangesAsync(); // Save to generate FK before linking
    }

    // STEP 2: Create address and assign the country
    // Using null-coalescing ('??') for safety, though the checks above make Address non-null
    var address = new Address
    {
        AddressId = Guid.NewGuid(),
        Latitude = orderCreateRequest.OrderAddress.Latitude,
        Longitude = orderCreateRequest.OrderAddress.Longitude,
        StreetName = orderCreateRequest.OrderAddress.StreetName,
        Country = country
    };

    // STEP 3: Create order
    var acc = await _accountrep.GetAccountByUserId(Guid.Parse(orderCreateRequest.AccountId));
    if (acc == null)
    {
        Console.WriteLine("Account is null");
        return;
    }
    
    var order = new Order
    {
        OrderId = Guid.NewGuid(),
        AccountId = acc.AccountId,
        // Logic to set CreatedAt, handling potential default value from client
        CreatedAt = orderCreateRequest.OrderDate == default ? DateTime.UtcNow : orderCreateRequest.OrderDate,
        ExpectedDelievery = DateTime.UtcNow.AddDays(7),
        IsDeleted = false,
        IsDelievered = false,
        TotalOrderPrice = 0m,
        OrderAddress = address,
        Notes = orderCreateRequest.Notes!=null?orderCreateRequest.Notes:"hello",
        OrderProducts = new List<OrderProduct>()
    };

    decimal totalPrice = 0m;

    // The null check above ensures orderCreateRequest.Products is not null
    foreach (var productItem in orderCreateRequest.Products)
    {
        Guid productId = Guid.Parse(productItem.ProductId);
         Console.WriteLine("product" + productItem.ProductId);
        var product = await _productRepository.GetByIdAysnc2(productId);
                Console.WriteLine("product" + product.ProductName);
                if (product == null)
        {
            throw new Exception($"Product with ID '{productId}' not found.");
        }

        var orderProduct = new OrderProduct
        {
            OrderProductId = Guid.NewGuid(),
            OrderId = order.OrderId,
            ProductId = productId,
            Quantity = productItem.Quantity,
            TotalPrice = product.ProductPrice * productItem.Quantity
        };

        totalPrice += orderProduct.TotalPrice;
        order.OrderProducts.Add(orderProduct);
        await _context.SaveChangesAsync();
    }

    order.TotalOrderPrice = totalPrice;

    // STEP 4: Save the full order, including address and country
    _context.Orders.Add(order);
    await _context.SaveChangesAsync();
}

    }
}
