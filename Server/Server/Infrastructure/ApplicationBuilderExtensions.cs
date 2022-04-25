using Microsoft.EntityFrameworkCore;
using Server.Data;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Server.Infrastructure
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseExtendedSwagger(this IApplicationBuilder app)
        {
            app
                .UseSwagger()
                .UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Forum Software API");
                    options.RoutePrefix = string.Empty;
                });

            return app;
        }

        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<ApplicationDbContext>();
            dbContext.Database.Migrate();
        }
    }
}
