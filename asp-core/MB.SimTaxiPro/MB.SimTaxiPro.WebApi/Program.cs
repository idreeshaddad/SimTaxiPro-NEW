
using MB.SimTaxiPro.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MB.SimTaxiPro.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);



            // Define CORS policy
            var apiCorsPolicy = "ApiCorsPolicy";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: apiCorsPolicy,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod()
                                        .AllowCredentials();
                                      //.WithMethods("OPTIONS", "GET");
                                  });
            });


            // Add services to the container.

            builder.Services.AddDbContext<SimTaxiProDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("defaultConnection")));

            builder.Services.AddAutoMapper(typeof(Program));

            builder.Services.AddControllers().AddNewtonsoftJson();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();


            // Use CORS policy
            app.UseCors(apiCorsPolicy);


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}