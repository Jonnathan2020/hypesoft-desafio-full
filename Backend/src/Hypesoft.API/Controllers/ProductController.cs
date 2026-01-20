using MediatR;
using Microsoft.AspNetCore.Mvc;
using Hypesoft.Application.Commands;
using Hypesoft.Application.Queries;

namespace Backend.src.Hypesoft.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private IMediator _mediador;


        public ProductController(IMediator mediador)
        {
            _mediador = mediador;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductCreateCommand command)
        {
            try
            {
                var result = await _mediador.Send(command);
                //return Ok(result); retorna o produto como retorno de testes
                return CreatedAtAction(nameof(GetProductById), new { id = result.Id }, new { success = true, data = result, message = "Produto criado com sucesso" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }



        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] int pagina = 1, [FromQuery] int paginaTam = 10, [FromQuery] string? busca = null, [FromQuery] string? categoriaId = null)
        {
            try
            {
                var query = new GetAllProductsQuery { Pagina = pagina, PaginaTam = paginaTam, Busca = busca, CategoriaId = categoriaId };
                var result = await _mediador.Send(query);

                return Ok(new { success = true, data = result, message = "Produtos recebidos com sucesso!!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            try
            {
                var query = new GetProductByIdQuery { Id = id };
                var result = await _mediador.Send(query);

                return Ok(new { success = true, data = result, message = "Produtos recebidos com sucesso!!" });

            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ProductUpdate(string id, [FromBody] ProductUpdateCommand command)
        {
            try
            {
                command.Id = id;
                var result = await _mediador.Send(command);
                return Ok(new { success = true, data = result, message = "Produto atualizado com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductById(string id)
        {
            try
            {
                var command = new ProductDeleteCommand { Id = id };
                await _mediador.Send(command);
                return Ok(new { successo = true, message = "Produto deletado com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPatch("{id}/estoque")]
        public async Task<IActionResult> StockUpdate(string id, [FromBody] StockUpdateRequest request)
        {
            try
            {
                var command = new ProductUpdateCommand { Id = id, QuantidadeEstoque = request.Quantidade };
                var result = await _mediador.Send(command);
                return Ok(new { success = true, data = result, message = "Estoque atualizado com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        public class StockUpdateRequest {

            public int Quantidade { get; set; }
        }

    }
    
}