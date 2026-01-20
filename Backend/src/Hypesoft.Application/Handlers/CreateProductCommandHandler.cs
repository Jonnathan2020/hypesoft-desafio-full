using MediatR;
using Backend.src.Hypesoft.Application.DTOs;
using Hypesoft.Application.Commands;
using Hypesoft.Domain.Repositories;
using Backend.src.Hypesoft.Domain.Entities;

namespace Hypesoft.Application.Handlers;

public class CreateProductCommandHandler : IRequestHandler<ProductCreateCommand, ProductDTO>
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public CreateProductCommandHandler(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<ProductDTO> Handle(ProductCreateCommand request, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Nome = request.Nome,
            Descricao = request.Descricao,
            Custo = request.Custo,
            Preco = request.Preco,
            CategoriaId = request.CategoriaId,
            QuantidadeEstoque = request.QuantidadeEstoque,
            CriadoEm = DateTime.UtcNow,
            AtualizadoEm = DateTime.UtcNow
        };

        await _productRepository.CreateAsync(product, cancellationToken);

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