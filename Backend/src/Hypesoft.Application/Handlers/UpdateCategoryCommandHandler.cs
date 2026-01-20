using MediatR;
using Hypesoft.Domain.Repositories;
using Backend.src.Hypesoft.Application.DTOs;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Handlers;

public class UpdateCategoryCommandHandler : IRequestHandler<CategoryUpdateCommand, CategoryDTO>
{
    private readonly ICategoryRepository _categoryRepository;

    public UpdateCategoryCommandHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<CategoryDTO> Handle(CategoryUpdateCommand request, CancellationToken cancellationToken)
    {
        var existingCategory = await _categoryRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (existingCategory == null)
        {
            throw new InvalidOperationException($"Categoria com ID {request.Id} não encontrada.");
        }

        // Atualizar apenas os campos fornecidos
        if (!string.IsNullOrEmpty(request.Nome))
        {
            existingCategory.Nome = request.Nome;
        }

        existingCategory.AtualizadoEm = DateTime.UtcNow;

        await _categoryRepository.UpdateAsync(existingCategory, cancellationToken);

        return new CategoryDTO
        {
            Id = existingCategory.Id,
            Nome = existingCategory.Nome,
            CriadoEm = existingCategory.CriadoEm,
            AtualizadoEm = existingCategory.AtualizadoEm
        };
    }

}