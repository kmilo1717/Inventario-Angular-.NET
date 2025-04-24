using InventarioAPI.src.Models;
using Microsoft.EntityFrameworkCore;

public class InventarioContext : DbContext
{
    public DbSet<Producto> Productos => Set<Producto>();

    public InventarioContext(DbContextOptions<InventarioContext> options) : base(options) { }
}