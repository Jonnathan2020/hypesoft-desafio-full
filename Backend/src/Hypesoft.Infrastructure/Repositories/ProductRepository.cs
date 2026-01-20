using Backend.src.Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly MongoDbContext _context;

    public ProductRepository(MongoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Products
            .Find(_ => true)
            .SortByDescending(p => p.CriadoEm)
            .ToListAsync(cancellationToken);
    }

    public async Task<(IEnumerable<Product> products, int totalCount)> GetAllAsync(
        int pagina,
        int paginaTam,
        string? busca = null,
        string? categoriaId = null,
        CancellationToken cancellationToken = default)
    {
        if (pagina <= 0) throw new ArgumentException("Número da página deve ser maior que 0", nameof(pagina));
        if (paginaTam <= 0) throw new ArgumentException("Tamanho da página dever ser maior que 0", nameof(paginaTam));

        var filterBuilder = Builders<Product>.Filter;
        var filter = filterBuilder.Empty;

        // Filtro de Pesquisa
        if (!string.IsNullOrWhiteSpace(busca))
        {
            var searchFilter = filterBuilder.Or(
                filterBuilder.Regex(p => p.Nome, new MongoDB.Bson.BsonRegularExpression(busca, "i")),
                filterBuilder.Regex(p => p.Descricao, new MongoDB.Bson.BsonRegularExpression(busca, "i"))
            );
            filter = filterBuilder.And(filter, searchFilter);
        }

        // Filtro de Categoria
        if (!string.IsNullOrWhiteSpace(categoriaId))
        {
            filter = filterBuilder.And(filter, filterBuilder.Eq(p => p.CategoriaId, categoriaId));
        }

        var totalCount = (int)await _context.Products.CountDocumentsAsync(filter, cancellationToken: cancellationToken);

        var products = await _context.Products
            .Find(filter)
            .SortByDescending(p => p.CriadoEm)
            .Skip((pagina - 1) * paginaTam)
            .Limit(paginaTam)
            .ToListAsync(cancellationToken);

        return (products, totalCount);
    }

    public async Task<Product?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new ArgumentException("Produto ID não pode ser nulo", nameof(id));

        return await _context.Products
            .Find(p => p.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IEnumerable<Product>> GetByCategoryIdAsync(string categoryId, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(categoryId))
            throw new ArgumentException("Categoria ID não pode ser nulo", nameof(categoryId));

        return await _context.Products
            .Find(p => p.CategoriaId == categoryId)
            .SortBy(p => p.Nome)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Product>> GetLowStockProductsAsync(int threshold, CancellationToken cancellationToken = default)
    {
        return await _context.Products
            .Find(p => p.QuantidadeEstoque <= threshold)
            .SortBy(p => p.QuantidadeEstoque)
            .ThenBy(p => p.Nome)
            .ToListAsync(cancellationToken);
    }

    public async Task CreateAsync(Product product, CancellationToken cancellationToken = default)
    {
        if (product == null)
            throw new ArgumentNullException(nameof(product));

        product.CriadoEm = DateTime.UtcNow;
        product.AtualizadoEm = DateTime.UtcNow;

        await _context.Products.InsertOneAsync(product, null, cancellationToken);
    }


    public async Task UpdateAsync(Product product, CancellationToken cancellationToken = default)
    {
        if (product == null)
            throw new ArgumentNullException(nameof(product));

        if (string.IsNullOrWhiteSpace(product.Id))
            throw new ArgumentException("Produto ID não pode ser nulo", nameof(product));

        product.AtualizadoEm = DateTime.UtcNow;

        var result = await _context.Products.ReplaceOneAsync(
            p => p.Id == product.Id,
            product,
            cancellationToken: cancellationToken);

        if (!result.IsAcknowledged || result.MatchedCount == 0)
            throw new InvalidOperationException($"Produto com ID {product.Id} não encontrado!!");
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new ArgumentException("ProdutoID não pode ser nulo", nameof(id));

        var result = await _context.Products.DeleteOneAsync(p => p.Id == id, cancellationToken);
        return result.IsAcknowledged && result.DeletedCount > 0;
    }

    public async Task<bool> ExistsAsync(string id, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(id))
            return false;

        return await _context.Products
            .Find(p => p.Id == id)
            .AnyAsync(cancellationToken);
    }

    public async Task<int> GetCountAsync(CancellationToken cancellationToken = default)
    {
        return (int)await _context.Products.CountDocumentsAsync(_ => true, cancellationToken: cancellationToken);
    }

    public async Task<decimal> GetTotalValueAsync(CancellationToken cancellationToken = default)
    {
        var products = await _context.Products
            .Find(_ => true)
            .Project(p => new { p.Preco, p.QuantidadeEstoque })
            .ToListAsync(cancellationToken);

        return products.Sum(p => p.Preco * p.QuantidadeEstoque);
    }
    
}