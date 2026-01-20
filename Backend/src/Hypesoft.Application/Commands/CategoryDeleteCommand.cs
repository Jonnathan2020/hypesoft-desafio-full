using MediatR;

namespace Hypesoft.Application.Commands;

public class CategoryDeleteCommand : IRequest<bool>
{
    public string Id { get; set; } = string.Empty;
}