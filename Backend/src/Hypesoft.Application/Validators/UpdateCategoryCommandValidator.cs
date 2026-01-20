using FluentValidation;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Validators;

public class UpdateCategoryCommandValidator : AbstractValidator<CategoryUpdateCommand>
{
    public UpdateCategoryCommandValidator()
    {
        RuleFor(c => c.Id)
            .NotEmpty().WithMessage("ID é obrigatório para atualização!");
        RuleFor(c => c.Nome)
            .NotEmpty().WithMessage("Nome é obrigatório!")
            .Length(3, 50).WithMessage("O nome deve ter de 3 a 50 caracteres!");
    }
}