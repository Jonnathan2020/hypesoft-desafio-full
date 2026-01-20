using Hypesoft.Application.DTOs;
using Hypesoft.Application.Queries;
using Hypesoft.Domain.Repositories;
using Backend.src.Hypesoft.Domain.Entities;
using Backend.src.Hypesoft.Application.DTOs;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Hypesoft.Application.Handlers;

public class GetDashboardQueryHandler : IRequestHandler<GetDashboardQuery, DashboardDTO>
{
	private readonly IProductRepository _productRepository;
	private readonly ICategoryRepository _categoryRepository;

	public GetDashboardQueryHandler(
		IProductRepository productRepository,
		ICategoryRepository categoryRepository)
	{
		_productRepository = productRepository;
		_categoryRepository = categoryRepository;
	}

	public async Task<DashboardDTO> Handle(GetDashboardQuery request, CancellationToken cancellationToken)
	{
		var products = await _productRepository.GetAllAsync(cancellationToken);
		var categories = await _categoryRepository.GetAllAsync(cancellationToken);

		var totalProdutos = products.Count();
		var totalCusto = products.Sum(p => p.Custo* p.QuantidadeEstoque);
		var  totalValores= products.Sum(p => p.Preco * p.QuantidadeEstoque);
		var produtosEstoqueBaixo = products.Where(p => p.QuantidadeEstoque < 10).ToList();

		var productsByCategory = categories.Select(category =>
		{
			var categoryProducts = products.Where(p => p.CategoriaId == category.Id).ToList();
			return new CategoryValuesDTO
			{
				NomeCategoria = category.Nome,
				QuantidadeProdutos = categoryProducts.Count,
				TotalCusto = categoryProducts.Sum(p => p.Custo * p.QuantidadeEstoque),
				TotalValores = categoryProducts.Sum(p => p.Preco * p.QuantidadeEstoque)
			};
		}).ToList();

		return new DashboardDTO
		{
			TotalProdutos = totalProdutos,
			TotalCusto = totalCusto,
			TotalValores = totalValores,
			ProdutosEstoqueBaixo = produtosEstoqueBaixo.Select(p => new ProductDTO
			{
				Id = p.Id,
				Nome = p.Nome,
				Descricao = p.Descricao,
				Custo = p.Custo,
				Preco = p.Preco,				
				CategoriaId = p.CategoriaId,
				QuantidadeEstoque = p.QuantidadeEstoque,
				CriadoEm = p.CriadoEm,
				AtualizadoEm = p.AtualizadoEm


			}).ToList(),
			ProdutosPorCategoria = productsByCategory
		};
	}
}