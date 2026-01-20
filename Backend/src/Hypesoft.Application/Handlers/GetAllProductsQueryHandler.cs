using MediatR;
using Hypesoft.Application.Queries;
using Hypesoft.Domain.Repositories;
using Backend.src.Hypesoft.Domain.Entities;
using Backend.src.Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Handlers;

public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, PaginatedProductsResult>
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public GetAllProductsQueryHandler(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<PaginatedProductsResult> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        
        var (products, totalCount) = await _productRepository.GetAllAsync(
            request.Pagina, 
            request.PaginaTam, 
            request.Busca, 
            request.CategoriaId, 
            cancellationToken);

        // Buscar apenas as categorias necessárias (otimização)
        var categoryIds = products.Select(p => p.CategoriaId).Distinct().Where(id => !string.IsNullOrEmpty(id)).ToList();
        var categories = categoryIds.Any() 
            ? await _categoryRepository.GetByIdsAsync(categoryIds, cancellationToken)
            : new List<Category>();

        var categoryDict = categories.ToDictionary(c => c.Id, c => c.Nome);

        // Mapear para DTOs
        var productDTOs = products.Select(p => new ProductDTO
        {
            Id = p.Id,
            Nome = p.Nome,
            Descricao = p.Descricao,
            Custo = p.Custo,
            Preco = p.Preco,
            CategoriaId = p.CategoriaId,
            QuantidadeEstoque = p.QuantidadeEstoque,
            CriadoEm = p.CriadoEm,
            AtualizadoEm = p.AtualizadoEm
        }).ToList();

        var totalPages = (int)Math.Ceiling((double)totalCount / request.PaginaTam);

        return new PaginatedProductsResult
        {
            Data = productDTOs,
            TotalContado = totalCount,
            PaginaNum = request.Pagina,
            PaginaTam = request.PaginaTam,
            TotalPaginas = totalPages
        };
    }
}