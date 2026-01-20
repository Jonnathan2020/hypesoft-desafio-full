using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public class GetDashboardQuery : IRequest<DashboardDTO>
{
}