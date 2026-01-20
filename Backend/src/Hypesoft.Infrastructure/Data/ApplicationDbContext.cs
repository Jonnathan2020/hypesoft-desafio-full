using Backend.src.Hypesoft.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;
using MongoDB.Driver.Core.Misc;

namespace Hypesoft.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToCollection("products");

            entity.HasKey(p => p.Id);

            entity.Property(p => p.Id)
                  .HasConversion<string>();

            entity.Property(p => p.Nome)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(p => p.Descricao)
                  .IsRequired()
                  .HasMaxLength(1000);

            entity.Property(p => p.Custo)
                  .IsRequired()
                  .HasPrecision(10, 2);

            entity.Property(p => p.Preco)
                  .IsRequired()
                  .HasPrecision(10, 2);

            entity.Property(p => p.CategoriaId)
                  .IsRequired()
                  .HasConversion<string>();

            entity.Property(p => p.QuantidadeEstoque)
                  .IsRequired();

            entity.Property(p => p.CriadoEm)
                  .IsRequired();

            entity.Property(p => p.AtualizadoEm)
                  .IsRequired();

            entity.HasIndex(p => p.Nome);
            entity.HasIndex(p => p.CategoriaId);
            entity.HasIndex(p => p.CriadoEm);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToCollection("categories");

            entity.HasKey(c => c.Id);

            entity.Property(c => c.Id)
                  .HasConversion<string>();

            entity.Property(c => c.Nome)
                  .IsRequired()
                  .HasMaxLength(50);

            entity.Property(c => c.QuantidadeProdutos)
                  .IsRequired();

            entity.Property(c => c.CriadoEm)
                  .IsRequired();

            entity.Property(c => c.AtualizadoEm)
                  .IsRequired();

            entity.HasIndex(c => c.Nome)
                  .IsUnique();

            entity.HasIndex(c => c.CriadoEm);
        });
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.Entity is Product product)
            {
                if (entry.State == EntityState.Added)
                {
                    product.CriadoEm = DateTime.UtcNow;
                }
                product.AtualizadoEm = DateTime.UtcNow;
            }
            else if (entry.Entity is Category category)
            {
                if (entry.State == EntityState.Added)
                {
                    category.CriadoEm = DateTime.UtcNow;
                }
                category.AtualizadoEm = DateTime.UtcNow;
            }
        }
    }
}