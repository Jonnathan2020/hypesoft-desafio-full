using Backend.src.Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public class GetAllProductsQuery : IRequest<PaginatedProductsResult>
{
    public int Pagina { get; set; } = 1;
    public int PaginaTam { get; set; } = 10;
    public string? Busca { get; set; }
    public string? CategoriaId { get; set; }
}

public class PaginatedProductsResult
{
    public List<ProductDTO> Data { get; set; } = new();
    public int TotalContado { get; set; }
    public int PaginaNum { get; set; }
    public int PaginaTam { get; set; }
    public int TotalPaginas { get; set; }
}