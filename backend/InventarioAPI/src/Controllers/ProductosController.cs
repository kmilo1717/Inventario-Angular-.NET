using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InventarioAPI.src.Services;
using InventarioAPI.src.DTOs;
[ApiController]
[Route("api/productos")]
[Authorize]
public class ProductosController : ControllerBase
{
    private readonly IProductoService _service;

    public ProductosController(IProductoService service)
    {
        _service = service;
    }

    [HttpGet("inventario")]
    public async Task<IActionResult> GetInventario()
    {
        var productos = await _service.GetInventarioAsync();
        return Ok(productos);
    }

    [HttpPost("movimiento")]
    public async Task<IActionResult> RegistrarMovimiento([FromBody] MovimientoRequestDTO req)
    {
        var result = await _service.RegistrarMovimientoAsync(req);
        if (!result)
            return BadRequest(new { message = "Error al registrar movimiento" });
        return Ok(new { message = "Movimiento registrado exitosamente" });
    }
}