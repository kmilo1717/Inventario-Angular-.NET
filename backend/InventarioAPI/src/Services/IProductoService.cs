using InventarioAPI.src.Models;
using InventarioAPI.src.DTOs;

namespace InventarioAPI.src.Services;

public interface IProductoService
{
    Task<List<Producto>> GetInventarioAsync();
    Task<bool> RegistrarMovimientoAsync(MovimientoRequestDTO req);
}