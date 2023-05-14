using api.Domain;
using api.Domain.Habits;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class HtContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Habit> Habits { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure your entity and property
        modelBuilder.Entity<User>()
            .HasIndex(e => e.Email)
            .IsUnique();

        base.OnModelCreating(modelBuilder);
    }

    protected readonly IConfiguration _configuration;

    public HtContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(_configuration.GetConnectionString("HtContext"));
    }
}
