using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace WebApplication1.Interfaces
{
    public interface IGenericRepository<T> where T:class
{
    Task<IEnumerable<T>> GetAllAysc();
    Task<T> GetByIdAysnc(Guid id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
        Task<T> GetByIdAysnc2(Guid id);


    }
}
