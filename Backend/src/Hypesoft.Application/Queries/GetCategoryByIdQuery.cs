using Backend.src.Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public class GetCategoryByIdQuery : IRequest<CategoryDTO>
{
    public string Id { get; set; } = string.Empty;
}