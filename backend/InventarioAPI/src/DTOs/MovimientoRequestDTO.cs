

namespace InventarioAPI.src.DTOs;
public class MovimientoRequestDTO
{
    public string Tipo { get; set; } = "";
    public ProductDTO Producto { get; set; } = new ProductDTO();
    
}