using Backend.src.Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public class ProductUpdateCommand : IRequest<ProductDTO>
{
    public string Id { get; set; } = string.Empty;
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public decimal? Custo{ get; set; }  
    public decimal? Preco { get; set; }
    public string? CategoriaId { get; set; }
    public int? QuantidadeEstoque { get; set; }
}