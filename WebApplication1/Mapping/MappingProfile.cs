using AutoMapper;
using WebApplication1.Models; // Your EF Core Entities
using WebApplication1.DTOs; // Your DTOs

public class MappingProfile : AutoMapper.Profile
{
    public MappingProfile()
    {
        // 1. Map the Address Entity (if it's simple, this is fine, otherwise map to AddressDto)
        // If Address structure is the same, AutoMapper handles it, but creating a specific DTO is cleaner.
        // Assuming Address is simple and safe for serialization:
        CreateMap<Address, Address>(); 


        // 2. Map the OrderProduct Entity to the OrderProductDto
        // This is ESSENTIAL for converting the nested collection items.
        // We pull the product details one level up to flatten the DTO.
        CreateMap<OrderProduct, OrderProductDto>()
          
            // Map the ProductId from the nested Product object
            .ForMember(
                dest => dest.ProductId,
                opt => opt.MapFrom(src => src.Product.ProductId)
            )
            // Other properties like Quantity, TotalPrice, OrderProductId map automatically by name
            


             .ForMember(
                // Destination: OrderProductDto.ProductName
                dest => dest.ProductName,
                // Source: OrderProduct.Product.ProductName
                opt => opt.MapFrom(src => src.Product.ProductName)
            )

              .ForMember(
                dest => dest.ProductUnitPrice, 
                // Note: Using ProductPrice as the unit price at the time of order
                opt => opt.MapFrom(src => src.Product.ProductPrice) 
            )
             .ForMember(
                dest => dest.ProductCategoryName, 
                // Navigate through two nested objects: OrderProduct.Product.Category.CategoryName
                opt => opt.MapFrom(src => src.Product.Category.CategoryName)
            )
            .ForMember(
                dest => dest.ProductBrandName, 
                // Navigate: OrderProduct.Product.Brand.BrandName
                opt => opt.MapFrom(src => src.Product.Brand.BrandName)
            );




        // 3. Map the core Order Entity to the OrderDto
        // AutoMapper will automatically use the mapping defined in step 2 for the OrderProducts collection.
        CreateMap<Order, OrderDto>()
        .ForMember(
                dest => dest.gender, 
                // Navigate: OrderProduct.Product.Brand.BrandName
                opt => opt.MapFrom(src => src.account.User.gender)
            );
        // If you were to map to an AddressDto, it would look like this:
        // CreateMap<Order, OrderDto>()
        //     .ForMember(dest => dest.OrderAddress, opt => opt.MapFrom(src => src.OrderAddress));
    }
}