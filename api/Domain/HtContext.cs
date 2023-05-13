using Microsoft.EntityFrameworkCore;

namespace api.Domain;

public class HtContext : DbContext
{
    protected readonly IConfiguration _configuration;

    public HtContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(_configuration.GetConnectionString("HtContext"));
    }

    public DbSet<Habit> Habits { get; set; } = null!;
}
