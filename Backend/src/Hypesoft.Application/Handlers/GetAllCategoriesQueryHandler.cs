using MediatR;
using Hypesoft.Application.Queries;
using Hypesoft.Domain.Repositories;
using Backend.src.Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Handlers;

public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CategoryDTO>>
{
    private readonly ICategoryRepository _categoryRepository;

    public GetAllCategoriesQueryHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<CategoryDTO>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _categoryRepository.GetAllAsync(cancellationToken);
        
        return categories.Select(c => new CategoryDTO
        {
            Id = c.Id,
            Nome = c.Nome,
            QuantidadeProdutos = c.QuantidadeProdutos,
            CriadoEm = c.CriadoEm,
            AtualizadoEm = c.AtualizadoEm,
        });
    }

}