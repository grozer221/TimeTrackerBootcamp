using FluentValidation;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO;
using TimeTracker.Server.Services;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests
{
    public class VacationRequestsQueries : ObjectGraphType
    {
        public VacationRequestsQueries(
            IHttpContextAccessor httpContextAccessor,
            IVacationRequestRepository vacationRequestRepository,
            IValidator<VacationRequestsGetInput> vacationRequestsGetInputValidator,
            VacationRequestsService vacationRequestsService
            )
        {
            Field<NonNullGraphType<IntGraphType>, int>()
               .Name("GetAvaliableDays")
               .ResolveAsync(async context =>
               {
                   var currentUserId = httpContextAccessor.HttpContext.GetUserId();
                   return await vacationRequestsService.GetAvaliableDaysAsync(currentUserId);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
            
            Field<NonNullGraphType<GetEntitiesResponseType<VacationRequestType, VacationRequestModel>>, GetEntitiesResponse<VacationRequestModel>>()
               .Name("Get")
               .Argument<NonNullGraphType<VacationRequestsGetInputType>, VacationRequestsGetInput>("VacationRequestsGetInputType", "Argument represent count of tracks on page")
               .ResolveAsync(async context =>
               {
                   var vacationRequestsGetInput = context.GetArgument<VacationRequestsGetInput>("VacationRequestsGetInputType");
                   vacationRequestsGetInputValidator.ValidateAndThrow(vacationRequestsGetInput);
                   return await vacationRequestRepository.GetAsync(vacationRequestsGetInput.PageNumber, vacationRequestsGetInput.PageSize);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<VacationRequestType>, VacationRequestModel>()
                .Name("GetById")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Id of user")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    var vacationRequest = await vacationRequestRepository.GetByIdAsync(id);
                    if (vacationRequest == null)
                        throw new ExecutionError("Vacation request not found");
                    return vacationRequest;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
