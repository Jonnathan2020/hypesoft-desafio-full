using Backend.src.Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public record GetAllCategoriesQuery() : IRequest<IEnumerable<CategoryDTO>>;