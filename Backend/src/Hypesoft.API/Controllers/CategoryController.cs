using Microsoft.AspNetCore.Mvc;
using MediatR;
using Hypesoft.Application.Queries;
using Hypesoft.Application.Commands;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Hypesoft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly IMediator _mediador;

    public CategoryController(IMediator mediador)
    {
        _mediador = mediador;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        try
        {
            var query = new GetAllCategoriesQuery();
            var result = await _mediador.Send(query);
            return Ok(new { success = true, data = result, message = "Categorias obtidas com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(string id)
    {
        try
        {
            var query = new GetCategoryByIdQuery { Id = id };
            var result = await _mediador.Send(query);
            return Ok(new { success = true, data = result, message = "Categoria obtida com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CategoryCreate([FromBody] CategoryCreateCommand command)
    {
        try
        {
            var result = await _mediador.Send(command);
            return CreatedAtAction(nameof(GetCategoryById), new { id = result.Id }, new { success = true, data = result, message = "Categoria criada com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> CategoryUpdate(string id, [FromBody] CategoryUpdateCommand command)
    {
        try
        {
            command.Id = id;
            var result = await _mediador.Send(command);
            return Ok(new { success = true, data = result, message = "Categoria atualizada com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(string id)
    {
        try
        {
            var command = new CategoryDeleteCommand { Id = id };
            await _mediador.Send(command);
            return Ok(new { success = true, message = "Categoria excluída com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }
}