using Backend.src.Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public class GetProductByIdQuery : IRequest<ProductDTO>
{
    public string Id { get; set; } = string.Empty;
}