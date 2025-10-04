using WebApplication1.Data;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
public class AccountWithPurchaseCountDto
{
    //public Guid AccountId { get; set; }
    //public string AccountName { get; set; }
    //public DateTime CreatedAt { get; set; }
    public Account account{ get; set; }
    public int PurchaseCount { get; set; }
}

namespace WebApplication1.Repositories
{
    public class AccountRepository : GenricRepository<Account>
    {
        private readonly ApplicationDbContext _context;

        public AccountRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Account?> GetAccountByAccountNameAsync(string accountName)
        {
            return await _context.Accounts
                                 .FirstOrDefaultAsync(a => a.AccountName == accountName);
        }

        public async Task<Account> GetAccountByUserId(Guid UserId){
            return await _context.Accounts.FirstOrDefaultAsync(a => a.UserId == UserId);
        }

        public async Task<List<AccountWithPurchaseCountDto>> GetAccountsWithPurchaseCounts()
{
    var data = await (from acc in _context.Accounts
                      join ord in _context.Orders
                          on acc.AccountId equals ord.AccountId into accountOrders
                      select new AccountWithPurchaseCountDto
                      {
                          account = acc,
                          PurchaseCount = accountOrders.Count()
                      }).ToListAsync();

    return data;
}

    }
}
