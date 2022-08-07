using FluentValidation;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.SickLeave.DTO;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave
{
    public class SickLeaveMutation : ObjectGraphType
    {
        public SickLeaveMutation(
            IHttpContextAccessor httpContextAccessor,
            ISickLeaveRepository sickLeaveRepository,
            IValidator<SickLeaveCreateInput> sickLeaveCreateInputValidator
            )
        {
            Field<NonNullGraphType<SickLeaveType>, SickLeaveModel>()
              .Name("Create")
              .Argument<NonNullGraphType<SickLeaveInputType>, SickLeaveCreateInput>("SickLeaveInputType", "")
              .ResolveAsync(async context =>
              {
                  var sickLeaveCreateInput = context.GetArgument<SickLeaveCreateInput>("SickLeaveInputType");
                  sickLeaveCreateInputValidator.ValidateAndThrow(sickLeaveCreateInput);

                  var sickLeave = sickLeaveCreateInput.ToModel();

                  return await sickLeaveRepository.CreateAsync(sickLeave);
              })
              .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<BooleanGraphType>, bool>()
               .Name("Remove")
               .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "")
               .ResolveAsync(async context =>
               {
                    var id = context.GetArgument<Guid>("Id");
                    var sickLeave = await sickLeaveRepository.GetByIdAsync(id);
                    if (sickLeave == null)
                        throw new Exception("Vacation request not found");

                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministrator())
                        throw new ExecutionError("You can not remove vacation request with status not New");

                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.NoteTheAbsenceAndVacation))
                        throw new ExecutionError("You do not have permissions for update vacation request");

                   await sickLeaveRepository.RemoveAsync(id);

                   return true;
               })
               .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<SickLeaveType>, SickLeaveModel>()
              .Name("Update")
              .Argument<NonNullGraphType<SickLeaveInputType>, SickLeaveCreateInput>("SickLeaveInputType", "")
              .ResolveAsync(async context =>
              {
                  var sickLeaveCreateInput = context.GetArgument<SickLeaveCreateInput>("SickLeaveInputType");
                  sickLeaveCreateInputValidator.ValidateAndThrow(sickLeaveCreateInput);

                  var sickLeave = sickLeaveCreateInput.ToModel();

                  return await sickLeaveRepository.UpdateAsync(sickLeave);
              })
              .AuthorizeWith(AuthPolicies.Authenticated);

        }
    }
}
