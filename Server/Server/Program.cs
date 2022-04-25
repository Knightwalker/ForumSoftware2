using Microsoft.EntityFrameworkCore;
using Server;
using Server.Data;
using Server.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
// configure strongly typed settings object
var appSettingsConfiguration = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsConfiguration);
var appSettings = appSettingsConfiguration.Get<AppSettings>();

builder.Services
    .AddDbContext<ApplicationDbContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        options.UseSqlServer(connectionString);
    })
    .AddIdentity()
    .AddJWTAuthentication(appSettings)
    .AddApplicationServices()
    .AddSwagger()
    .AddDatabaseDeveloperPageExceptionFilter()
    .AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app
    .UseExtendedSwagger()
    .UseRouting()
    .UseCors(options =>
    {
        options.AllowAnyOrigin();
        options.AllowAnyHeader();
        options.AllowAnyMethod();
    })
    .UseAuthentication()
    .UseAuthorization()
    .UseEndpoints(endpoints => { 
        endpoints.MapControllers(); 
    })
    .ApplyMigrations();

app.Run();
