using Microsoft.EntityFrameworkCore;
class SomethingContext : DbContext
{
    public SomethingContext(DbContextOptions<SomethingContext> options) : base(options) { }
    public DbSet<Squid> Squids => Set<Squid>();
    public DbSet<Instrument> Instruments => Set<Instrument>();
}