using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace MB.SimTaxiPro.EntityFrameworkCore
{
    public class SimTaxiProDbContextFactory : IDesignTimeDbContextFactory<SimTaxiProDbContext>
    {
        public SimTaxiProDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SimTaxiProDbContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=MB.SimTaxiPro;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new SimTaxiProDbContext(optionsBuilder.Options);
        }
    }
}
