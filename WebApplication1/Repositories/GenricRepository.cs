

using System.Data;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization.Metadata;
using System.Threading.Tasks.Dataflow;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApplication1.Data;
using WebApplication1.Interfaces;

namespace WebApplication1.Repositories
{
    public class GenricRepository<T> : IGenericRepository<T> where T:class 
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbset;
       public GenricRepository(ApplicationDbContext context){
            _context = context;
            _dbset = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAysc()
{
            IEnumerable<T> enitities = await _dbset.ToListAsync();
            return enitities;

        }
public async Task<IEnumerable<T>> GetAllAsync2()
{
    IQueryable<T> query = _dbset.AsQueryable();

    // Get the EF Core metadata for the entity type
    var entityType = _context.Model.FindEntityType(typeof(T));
    
    if (entityType == null)
    {
        return await query.ToListAsync();
    }

    // Get all navigation properties
    var navigations = entityType.GetNavigations();
    
    foreach (var navigation in navigations)
    {
        // Use the string-based Include for simplicity
        // Alternatively, you could build expression-based includes
        query = query.Include(navigation.Name);
    }

    return await query.ToListAsync();
}
public async Task<T> GetByIdAysnc2(Guid id){
             return await _dbset.FindAsync(id);
        }
public async Task<T> GetByIdAysnc(Guid id)
{
    // Get the entity type for the generic type T
    var entityType = _context.Model.FindEntityType(typeof(T));
    
    // If no entity type is found, return null (or handle error)
    if (entityType == null)
    {
        return null;
    }
    
    // Start the query on the DbSet
    var query = _dbset.AsQueryable();

    // Get all navigation properties of the entity type
    var navigations = entityType.GetNavigations();
    
    foreach (var navigation in navigations)
    {
        // Dynamically include related entities based on navigation names
        query = query.Include(navigation.Name);
    }

    // Execute the query to find the entity by ID
    var entity = await query.FirstOrDefaultAsync(e => EF.Property<Guid>(e, "Id") == id);

    return entity;
}


public async Task AddAsync(T entity)
{
            _dbset.Add(entity);
            await _context.SaveChangesAsync();
        }

public async Task UpdateAsync(T entity)
{
            _dbset.Update(entity);
            await _context.SaveChangesAsync();
        }

public async Task DeleteAsync(Guid id)
{
    T entity = await _dbset.FindAsync(id);
    if (entity == null)
    {
        throw new KeyNotFoundException("Entity not found");
    }

            _dbset.Remove(entity);
            await _context.SaveChangesAsync();


        }  
}
 }