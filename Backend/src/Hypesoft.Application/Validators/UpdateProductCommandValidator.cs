using FluentValidation;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Validators;

public class UpdateProductCommandValidator : AbstractValidator<ProductUpdateCommand>
{
    public UpdateProductCommandValidator()
    {
        RuleFor(p => p.Id)
            .NotEmpty().WithMessage("O ID é obrigatório para atualização!");

        RuleFor(p => p.Nome)
            .Length(1, 100).WithMessage("O nome deve ter de 1 a 100 caracteres!")
            .When(p => !string.IsNullOrEmpty(p.Nome));

        RuleFor(p => p.Descricao)
            .Length(1, 400).WithMessage("A descrição deve ter entre 1 e 400 caracteres!")
            .When(p => !string.IsNullOrEmpty(p.Descricao));

        RuleFor(p => p.Custo)
            .GreaterThanOrEqualTo(0).WithMessage("O preço do produto deve ser maior ou igual a zero!")
            .When(p => p.Custo.HasValue);

        RuleFor(p => p.Preco)
            .GreaterThanOrEqualTo(0).WithMessage("O preço do produto deve ser maior ou igual a zero!")
            .When(p => p.Preco.HasValue);

        RuleFor(p => p.QuantidadeEstoque)
            .GreaterThanOrEqualTo(0).WithMessage("A quantidade em estoque não pode ser negativa.")
            .When(p => p.QuantidadeEstoque.HasValue);
    }
}