using Lab.Api.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Usuario> Usuarios { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>()
            .Property(u => u.Correo)
            .HasMaxLength(50)
            .IsRequired()
            .HasDefaultValue("0");

        modelBuilder.Entity<Usuario>()
            .Property(u => u.Pass)
            .HasMaxLength(50)
            .IsRequired()
            .HasDefaultValue("0");

        modelBuilder.Entity<Usuario>()
            .Property(u => u.Nombre)
            .HasMaxLength(50)
            .IsRequired()
            .HasDefaultValue("0");

        modelBuilder.Entity<Usuario>()
            .Property(u => u.Guid)
            .HasMaxLength(50)
            .IsRequired()
            .HasDefaultValue("0");

        modelBuilder.Entity<Usuario>()
            .Property(u => u.Vigencia)
            .HasColumnType("datetime");

        modelBuilder.Entity<Usuario>()
            .Property(u => u.Codigo)
            .HasMaxLength(50);
    }
}

