using MediatR;
using Hypesoft.Domain.Repositories;
using Hypesoft.Application.Commands;
using Backend.src.Hypesoft.Application.DTOs;
using Backend.src.Hypesoft.Domain.Entities;

namespace Hypesoft.Application.Handlers;

public class CreateCategoryCommandHandler : IRequestHandler<CategoryCreateCommand, CategoryDTO>
{
    private readonly ICategoryRepository _categoryRepository;

    public CreateCategoryCommandHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<CategoryDTO> Handle(CategoryCreateCommand request, CancellationToken cancellationToken)
    {
        var category = new Category()
        {
            Nome = request.Nome,
            CriadoEm = DateTime.UtcNow,
            AtualizadoEm = DateTime.UtcNow
        };

        await _categoryRepository.AddAsync(category, cancellationToken);

        return new CategoryDTO
        {
            Id = category.Id,
            Nome = category.Nome,
            CriadoEm = category.CriadoEm,
            AtualizadoEm = category.AtualizadoEm
        };
    }

}