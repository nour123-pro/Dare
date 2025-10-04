using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Models
{
    public class User : IdentityUser<Guid>
    {
        public override Guid Id { get => base.Id; set => base.Id = value; }
        public override string? UserName { get => base.UserName; set => base.UserName = value; }
        public override string? NormalizedUserName { get => base.NormalizedUserName; set => base.NormalizedUserName = value; }
        public override string? Email { get => base.Email; set => base.Email = value; }
        public override string? NormalizedEmail { get => base.NormalizedEmail; set => base.NormalizedEmail = value; }
        public override bool EmailConfirmed { get => base.EmailConfirmed; set => base.EmailConfirmed = value; }
        public override string? PasswordHash { get => base.PasswordHash; set => base.PasswordHash = value; }
        public override string? SecurityStamp { get => base.SecurityStamp; set => base.SecurityStamp = value; }
        public override string? ConcurrencyStamp { get => base.ConcurrencyStamp; set => base.ConcurrencyStamp = value; }
        public override string? PhoneNumber { get => base.PhoneNumber; set => base.PhoneNumber = value; }
        public override bool PhoneNumberConfirmed { get => base.PhoneNumberConfirmed; set => base.PhoneNumberConfirmed = value; }
        public override bool TwoFactorEnabled { get => base.TwoFactorEnabled; set => base.TwoFactorEnabled = value; }
        public override DateTimeOffset? LockoutEnd { get => base.LockoutEnd; set => base.LockoutEnd = value; }
        public override bool LockoutEnabled { get => base.LockoutEnabled; set => base.LockoutEnabled = value; }
        public override int AccessFailedCount { get => base.AccessFailedCount; set => base.AccessFailedCount = value; }

        public override bool Equals(object? obj)
        {
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override string ToString()
        {
            return base.ToString();
        }
       public Gender gender{ get; set; }
        public enum Gender{ 
            Female,
            Male
         }

         public string FirstName{ get; set; }
         public string LastName{get;set; }
         public DateOnly BirthDate{ get; set; }
         public DateTime CreatedAt{ get; set; }
         public bool IsDeleted{ get; set; }

    }
}