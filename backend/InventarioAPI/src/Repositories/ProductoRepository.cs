using Microsoft.EntityFrameworkCore;
using InventarioAPI.src.Models;

namespace InventarioAPI.src.Repositories;

public class ProductoRepository : IProductoRepository
{
    private readonly InventarioContext _context;

    public ProductoRepository(InventarioContext context)
    {
        _context = context;
    }

    public async Task<List<Producto>> GetProductosAsync()
    {
        return await _context.Productos.ToListAsync();
    }

    public async Task<Producto?> GetProductoByIdAsync(int id)
    {
        return await _context.Productos.FindAsync(id);
    }

    public async Task<bool> UpdateProductoAsync(Producto producto)
    {
        _context.Productos.Update(producto);
        var result = await _context.SaveChangesAsync();
        return result > 0;
        
    }

    public async Task<bool> AddProductoAsync(Producto producto)
    {
        _context.Productos.Add(producto);
        var result = await _context.SaveChangesAsync();
        return result > 0;
    }
}