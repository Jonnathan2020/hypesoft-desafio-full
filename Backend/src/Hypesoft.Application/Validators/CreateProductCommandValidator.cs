using FluentValidation;
using Hypesoft.Application.Commands;
using Hypesoft.Domain.Repositories;

namespace Hypesoft.Application.Validators;

public class CreateProductCommandValidator : AbstractValidator<ProductCreateCommand>
{
    private readonly ICategoryRepository _categoryRepository;

    public CreateProductCommandValidator(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;

        ConfigureNomeValidation();
        ConfigureDescricaoValidation();
        ConfigureCustoValidation();
        ConfigurePrecoValidation();
        ConfigureEstoqueValidation();
        ConfigureCategoriaValidation();
    }

    private void ConfigureNomeValidation()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
            .WithMessage("Nome do produto é obrigatório")
            .WithErrorCode("PRODUCT_NAME_REQUIRED")
            .Length(1, 100)
            .WithMessage("Nome do produto deve ter de 1 a 100 caracteres")
            .WithErrorCode("PRODUCT_NAME_LENGTH");
    }

    private void ConfigureDescricaoValidation()
    {
        RuleFor(x => x.Descricao)
            .NotEmpty()
            .WithMessage("Descrição do produto é obrigatória!")
            .WithErrorCode("PRODUCT_DESCRIPTION_REQUIRED")
            .Length(1, 400)
            .WithMessage("Descrição deve ter de 1 a 400 caracteres!")
            .WithErrorCode("PRODUCT_DESCRIPTION_LENGTH");
    }
    private void ConfigureCustoValidation()
    {
        RuleFor(x => x.Preco)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Custo deve ser maior ou igual a zero!")
            .WithErrorCode("PRODUCT_COST_INVALID")
            .LessThan(100000)
            .WithMessage("Custo não pode ser maior que R$ 100.000,00!")
            .WithErrorCode("PRODUCT_COST_TOO_HIGH");
    }

    private void ConfigurePrecoValidation()
    {
        RuleFor(x => x.Preco)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Preço deve ser maior ou igual a zero")
            .WithErrorCode("PRODUCT_PRICE_INVALID")
            .LessThan(10000000)
            .WithMessage("Preço não pode ser maior que R$ 10.000.000,00")
            .WithErrorCode("PRODUCT_PRICE_TOO_HIGH");
    }

    private void ConfigureEstoqueValidation()
    {
        RuleFor(x => x.QuantidadeEstoque)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Estoque não pode ser negativa")
            .WithErrorCode("PRODUCT_STOCK_NEGATIVE")
            .LessThan(100000)
            .WithMessage("Estoque não pode exceder 100.000 unidades")
            .WithErrorCode("PRODUCT_STOCK_TOO_HIGH");
    }

    private void ConfigureCategoriaValidation()
    {
        RuleFor(x => x.CategoriaId)
            .MustAsync(CategoryExists)
            .WithMessage("Categoria selecionada não existe")
            .WithErrorCode("PRODUCT_CATEGORY_NOT_FOUND")
            .When(x => !string.IsNullOrEmpty(x.CategoriaId));
    }

    private async Task<bool> CategoryExists(string categoryId, CancellationToken cancellationToken)
    {
        // Categoria vazia é permitida
        if (string.IsNullOrEmpty(categoryId))
        {   
            return true;
        }

        var category = await _categoryRepository.GetByIdAsync(categoryId, cancellationToken);
        return category != null;
        
    }
}