using Microsoft.AspNetCore.Mvc;
using MediatR;
using Hypesoft.Application.Queries;
using Hypesoft.Application.Commands;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Hypesoft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IMediator _mediador;

    public DashboardController(IMediator mediador)
    {
        _mediador = mediador;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        try
        {
            var stats = await _mediador.Send(new GetDashboardQuery());
            return Ok(new { success = true, data = stats, message = "Estat�sticas obtidas com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpPost("seed")]
    public async Task<IActionResult> SeedData()
    {
        try
        {
            // Categorias
            var mercearia = await _mediador.Send(new CategoryCreateCommand
            {
                Nome = "mercearia",

            });

            var bebidas = await _mediador.Send(new CategoryCreateCommand
            {
                Nome = "bebidas",

            });

            var eletronicos = await _mediador.Send(new CategoryCreateCommand
            {
                Nome = "eletronicos",
            });


            var eletrodomesticos = await _mediador.Send(new CategoryCreateCommand
            {
                Nome = "eletrodomesticos",

            });

            var jogos = await _mediador.Send(new CategoryCreateCommand
            {
                Nome = "jogos",

            });

            // Produtos Mercearia

            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Amendoim 500g",
                Descricao= "Pacote de amendoim 500g",
                Custo = 7.50M,
                Preco = 15.99M,
                CategoriaId = eletronicos.Id,
                QuantidadeEstoque = 24
            });

            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Arroz Tipo 1 - 5kg",
                Descricao = "Arroz branco tipo 1 pacote de 5kg",
                Custo = 18.50M,
                Preco = 29.90M,
                CategoriaId = mercearia.Id,
                QuantidadeEstoque = 40
            });

            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Feij�o Carioca - 1kg",
                Descricao = "Feij�o carioca selecionado 1kg",
                Custo = 6.80M,
                Preco = 12.90M,
                CategoriaId = mercearia.Id,
                QuantidadeEstoque = 55
            });

            // Produtos Bebidas
            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Coca-Cola 2L",
                Descricao = "Refrigerante Coca-Cola garrafa 2 litros",
                Custo = 6.50M,
                Preco = 11.99M,
                CategoriaId = bebidas.Id,
                QuantidadeEstoque = 30
            });

            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Suco de Laranja Integral 1L",
                Descricao = "Suco de laranja integral sem a��car",
                Custo = 5.20M,
                Preco = 9.50M,
                CategoriaId = bebidas.Id,
                QuantidadeEstoque = 18
            });

            // Produtos Eletr�nicos
            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Mouse USB",
                Descricao = "Mouse �ptico USB 1200 DPI",
                Custo = 18.00M,
                Preco = 39.90M,
                CategoriaId = eletronicos.Id,
                QuantidadeEstoque = 22
            });

            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Teclado USB",
                Descricao = "Teclado padr�o ABNT2 USB",
                Custo = 32.00M,
                Preco = 69.90M,
                CategoriaId = eletronicos.Id,
                QuantidadeEstoque = 15
            });

            // Produtos Eletrodom�sticos
            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Liquidificador 600W",
                Descricao = "Liquidificador 600W com 3 velocidades",
                Custo = 120.00M,
                Preco = 199.90M,
                CategoriaId = eletrodomesticos.Id,
                QuantidadeEstoque = 10
            });

            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Sanduicheira El�trica",
                Descricao = "Sanduicheira antiaderente 750W",
                Custo = 85.00M,
                Preco = 149.90M,
                CategoriaId = eletrodomesticos.Id,
                QuantidadeEstoque = 8
            });

            // Produtos Jogos
            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Controle Xbox Wireless",
                Descricao = "Controle sem fio compat�vel com Xbox e PC",
                Custo = 280.00M,
                Preco = 399.90M,
                CategoriaId = jogos.Id,
                QuantidadeEstoque = 6
            });

            await _mediador.Send(new ProductCreateCommand
            {
                Nome = "Jogo FIFA 24 - PS5",
                Descricao = "Jogo FIFA 24 para PlayStation 5",
                Custo = 210.00M,
                Preco = 299.90M,
                CategoriaId = jogos.Id,
                QuantidadeEstoque = 12
            });

            return Ok(new { success = true, message = "Dados de exemplo criados com sucesso! 5 categorias e 10 produtos foram adicionados." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = $"Erro ao criar dados de exemplo: {ex.Message}" });
        }
    }
}