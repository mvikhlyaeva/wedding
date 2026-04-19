using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Guest> Guests => Set<Guest>();
    public DbSet<GuestPerson> GuestPersons => Set<GuestPerson>();
    public DbSet<Rsvp> Rsvps => Set<Rsvp>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Guest>()
            .HasIndex(g => g.Code)
            .IsUnique();

        modelBuilder.Entity<Rsvp>()
            .HasIndex(r => r.GuestId)
            .IsUnique();

        modelBuilder.Entity<Guest>().HasData(
            new Guest { Id = 1, Code = "vd", Name = "Виктория и Дмитрий" },
            new Guest { Id = 2, Code = "aa", Name = "Анастасия и Антон" },
            new Guest { Id = 3, Code = "yana", Name = "Яна" }
        );

        modelBuilder.Entity<GuestPerson>().HasData(
            new GuestPerson { Id = 1, GuestId = 1, Name = "Виктория" },
            new GuestPerson { Id = 2, GuestId = 1, Name = "Дмитрий" },
            new GuestPerson { Id = 3, GuestId = 2, Name = "Анастасия" },
            new GuestPerson { Id = 4, GuestId = 2, Name = "Антон" },
            new GuestPerson { Id = 5, GuestId = 3, Name = "Яна" }
        );
    }
}
