using InventarioAPI.src.Models;
namespace InventarioAPI.src.Repositories;
public interface IProductoRepository
{
    Task<bool> AddProductoAsync(Producto producto);
    Task<List<Producto>> GetProductosAsync();
    Task<Producto?> GetProductoByIdAsync(int id);
    Task<bool> UpdateProductoAsync(Producto producto);

}