using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Repositories;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using AutoMapper;
using WebApplication1.DTOs;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
   options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
   ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
   )
);
//add api with AllowReactApp
builder.Services.AddCors(options =>
{
options.AddPolicy("AllowReactApp",
policy => policy.WithOrigins("http://localhost:5173")
                                .AllowAnyMethod()
                                .AllowAnyHeader()
    );
}
);
builder.Services.AddIdentity<User, IdentityRole<Guid>>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddSignInManager<SignInManager<User>>()
                .AddUserManager<UserManager<User>>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<AccountRepository>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<BrandRepository>();
builder.Services.AddScoped<CategoryRepository>();
builder.Services.AddScoped<ReviewRepository>();
builder.Services.AddScoped<OrderRepository>();
builder.Services.AddScoped<CountryRepository>();
builder.Services.AddScoped<AddressRepository>();
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly); 
// Add services to the container.
builder.Services.AddAuthentication(options =>
{
   
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie()
.AddGoogle(options =>
{
    options.ClientId = "1074491542320-rhsjnlvkvskfeh4ookrdl25muk14vrjc.apps.googleusercontent.com";  // Replace with your Google client ID
    options.ClientSecret = "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";  // Replace with your Google client secret
    options.Scope.Add("email");
    options.SaveTokens = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors("AllowReactApp");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
