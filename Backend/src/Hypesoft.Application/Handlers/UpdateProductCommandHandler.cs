using MediatR;
using Hypesoft.Domain.Repositories;
using Backend.src.Hypesoft.Application.DTOs;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Handlers;

public class UpdateProductCommandHandler : IRequestHandler<ProductUpdateCommand, ProductDTO>
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public UpdateProductCommandHandler(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<ProductDTO> Handle(ProductUpdateCommand request, CancellationToken cancellationToken)
    {
        var existingProduct = await _productRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (existingProduct == null)
        {
            throw new InvalidOperationException($"Produto com ID {request.Id} não encontrado.");
        }

        // Atualizar apenas os campos fornecidos
        if (!string.IsNullOrEmpty(request.Nome))
        {
            existingProduct.Nome = request.Nome;
        }

        if (!string.IsNullOrEmpty(request.Descricao))
        {
            existingProduct.Descricao = request.Descricao;
        }

        if (request.Custo.HasValue)
        {
                existingProduct.Custo = request.Custo.Value;
        }

        if (request.Preco.HasValue)
        {
            existingProduct.Preco = request.Preco.Value;
        }

        if (!string.IsNullOrEmpty(request.CategoriaId))
        {   
            existingProduct.CategoriaId = request.CategoriaId;
        }
        
        if (request.QuantidadeEstoque.HasValue)
            existingProduct.QuantidadeEstoque = request.QuantidadeEstoque.Value;

        existingProduct.AtualizadoEm = DateTime.UtcNow;

        await _productRepository.UpdateAsync(existingProduct, cancellationToken);

        var categories = await _categoryRepository.GetAllAsync(cancellationToken);
        var category = categories.FirstOrDefault(c => c.Id == existingProduct.CategoriaId);

        return new ProductDTO
        {
            Id = existingProduct.Id,
            Nome = existingProduct.Nome,
            Descricao = existingProduct.Descricao,
            Custo = existingProduct.Custo,
            Preco = existingProduct.Preco,
            CategoriaId = existingProduct.CategoriaId,
            QuantidadeEstoque = existingProduct.QuantidadeEstoque,
            CriadoEm = existingProduct.CriadoEm,
            AtualizadoEm = existingProduct.AtualizadoEm
        };
    }
}