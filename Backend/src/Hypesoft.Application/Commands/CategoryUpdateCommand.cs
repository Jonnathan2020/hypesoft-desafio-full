
using Backend.src.Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public class CategoryUpdateCommand : IRequest<CategoryDTO>
{
    public string Id { get; set; } = string.Empty;
    public string? Nome { get; set; }
}