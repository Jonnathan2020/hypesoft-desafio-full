using Backend.src.Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public class CategoryCreateCommand : IRequest<CategoryDTO>
{
    public string Nome { get; set; } = string.Empty;
}