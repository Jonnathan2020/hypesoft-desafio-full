using MediatR;

namespace Hypesoft.Application.Commands;

public class ProductDeleteCommand : IRequest<bool>
{
    public string Id { get; set; } = string.Empty;
}