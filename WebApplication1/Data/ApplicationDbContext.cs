using System.Collections.Concurrent;
using AutoMapper.Internal;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Identity.Client;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts{ get; set; }
        public DbSet<WishListProduct> WishListProducts{ get; set; }
        public DbSet<Category> Categories{ get; set; }
        public DbSet<Brand> Brands{ get; set; }
        public DbSet<Address> Addresses{ get; set; }
        public DbSet<Review> Reviews{ get; set; }
        public DbSet<Country> Countries{ get; set; }



    }
}