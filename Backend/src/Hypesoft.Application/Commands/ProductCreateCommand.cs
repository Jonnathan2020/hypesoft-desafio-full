using Backend.src.Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public class ProductCreateCommand : IRequest<ProductDTO>
{
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public decimal Custo{ get; set; }  
    public decimal Preco { get; set; }
    public string CategoriaId { get; set; } = string.Empty;
    public int QuantidadeEstoque { get; set; }
}