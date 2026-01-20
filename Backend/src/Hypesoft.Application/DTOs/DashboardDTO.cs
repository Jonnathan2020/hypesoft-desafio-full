using Backend.src.Hypesoft.Application.DTOs;
using Hypesoft.Application.DTOs;
using System.Collections.Generic;

namespace Hypesoft.Application.DTOs;

public class DashboardDTO
{
    public int TotalProdutos { get; set; }
    public decimal TotalCusto { get; set; }
    public decimal TotalValores { get; set; }
    public List<ProductDTO> ProdutosEstoqueBaixo{ get; set; } = new();
    public List<CategoryValuesDTO> ProdutosPorCategoria { get; set; } = new();
}

public class CategoryValuesDTO
{
    public string NomeCategoria { get; set; } = string.Empty;
    public int QuantidadeProdutos { get; set; }
    public decimal TotalCusto { get; set; }
    public decimal TotalValores { get; set; }
}