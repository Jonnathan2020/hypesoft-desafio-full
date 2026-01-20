using Hypesoft.Domain.Common;

namespace Hypesoft.Domain.DomainEvents;

public sealed class ProductCreatedEvent : DomainEvent
{
    public string ProdutoId { get; }
    public string ProdutoNome { get; }
    public decimal Custo { get; }
    public decimal Preco { get; }
    public string CategoriaId { get; }
    public int InitialStock { get; }

    public ProductCreatedEvent(
        string produtoId,
        string produtoNome,
        string categoriaId,
        decimal custo,
        decimal preco,
        int initialStock)
    {
        ProdutoId = produtoId;
        ProdutoNome = produtoNome;
        CategoriaId = categoriaId;
        Custo = custo;
        Preco = preco;
        InitialStock = initialStock;
    }
}