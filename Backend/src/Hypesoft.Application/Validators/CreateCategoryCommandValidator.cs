using FluentValidation;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Validators;

public class CreateCategoryCommandValidator : AbstractValidator<CategoryCreateCommand>
{
    public CreateCategoryCommandValidator()
    {
        RuleFor(c => c.Nome)
            .NotEmpty().WithMessage("O nome é obrigatório!")
            .Length(3, 50).WithMessage("O nome deve ter de 3 a 50 caracteres!");
    }
}
