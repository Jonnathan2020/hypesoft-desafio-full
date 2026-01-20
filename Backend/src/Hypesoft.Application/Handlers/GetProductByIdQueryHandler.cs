using MediatR;
using Hypesoft.Application.Queries;
using Hypesoft.Domain.Repositories;
using Backend.src.Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Handlers;

public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDTO>
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public GetProductByIdQueryHandler(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<ProductDTO> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (product == null)
        {
            throw new InvalidOperationException($"Produto com ID {request.Id} não encontrado.");
        }

        var categories = await _categoryRepository.GetAllAsync(cancellationToken);
        var category = categories.FirstOrDefault(c => c.Id == product.CategoriaId);

        return new ProductDTO
        {
            Id = product.Id,
            Nome = product.Nome,
            Descricao = product.Descricao,
            Custo = product.Custo,
            Preco = product.Preco,
            CategoriaId = product.CategoriaId,
            QuantidadeEstoque = product.QuantidadeEstoque,
            CriadoEm = product.CriadoEm,
            AtualizadoEm = product.AtualizadoEm
        };
    }

}