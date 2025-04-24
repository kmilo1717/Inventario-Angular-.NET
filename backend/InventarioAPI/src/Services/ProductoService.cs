using InventarioAPI.src.Repositories;
using InventarioAPI.src.Models;
using InventarioAPI.src.DTOs;
namespace InventarioAPI.src.Services;
public class ProductoService : IProductoService
{
    private readonly IProductoRepository _repo;

    public ProductoService(IProductoRepository repo)
    {
        _repo = repo;
    }

    public Task<List<Producto>> GetInventarioAsync()
    {
        return _repo.GetProductosAsync();
    }

    public async Task<bool> RegistrarMovimientoAsync(MovimientoRequestDTO dto)
    {
        Producto? producto = null;

        if (dto.Producto.Id.HasValue)
        {
            producto = await _repo.GetProductoByIdAsync(dto.Producto.Id.Value);
            if (producto == null)
                return false;
        }
        else
        {
            if (dto.Tipo != "entrada" || string.IsNullOrWhiteSpace(dto.Producto.Nombre))
                return false;

            producto = new Producto
            {
                Nombre = dto.Producto.Nombre,
                Cantidad = 0
            };

            await _repo.AddProductoAsync(producto);
        }

        if (dto.Tipo == "entrada")
        {
            producto.Cantidad += dto.Producto.Cantidad;
        }
        else if (dto.Tipo == "salida")
        {
            if (producto.Cantidad < dto.Producto.Cantidad) return false;
            producto.Cantidad -= dto.Producto.Cantidad;
        }
        else
        {
            return false;
        }

        await _repo.UpdateProductoAsync(producto);
        return true;
    }

}
