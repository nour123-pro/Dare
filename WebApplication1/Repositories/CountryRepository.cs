using WebApplication1.Models;
using WebApplication1.Data;
using Microsoft.AspNetCore.Server.Kestrel.Https;
namespace WebApplication1.Repositories
{
    public class CountryRepository : GenricRepository<Country>
    {
        private readonly ApplicationDbContext _dbContext;
        public CountryRepository(ApplicationDbContext context) : base(context)
        {
            _dbContext = context;
        }


        public Country GetCountryByName(string countryname){
            var countrywanted = _dbContext.Countries.FirstOrDefault(co =>co.CountryName == countryname);
            return countrywanted;
        } 
    }
}