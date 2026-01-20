using MediatR;
using Hypesoft.Application.Queries;
using Hypesoft.Domain.Repositories;
using Backend.src.Hypesoft.Domain.Entities;
using Backend.src.Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Handlers;

public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDTO>
{
    private readonly ICategoryRepository _categoryRepository;

    public GetCategoryByIdQueryHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<CategoryDTO> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        var category = await _categoryRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (category == null)
        {
            throw new InvalidOperationException($"Categoria com ID {request.Id} não encontrada.");
        }

        return new CategoryDTO
        {
            Id = category.Id,
            Nome = category.Nome,
            QuantidadeProdutos = category.QuantidadeProdutos,
            CriadoEm = category.CriadoEm,
            AtualizadoEm = category.AtualizadoEm
        };
    }

}