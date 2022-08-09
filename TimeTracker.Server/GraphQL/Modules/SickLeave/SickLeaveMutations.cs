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
    public class SickLeaveMutations : ObjectGraphType
    {
        public SickLeaveMutations(
            IHttpContextAccessor httpContextAccessor,
            ISickLeaveRepository sickLeaveRepository,
            IValidator<SickLeaveCreateInput> sickLeaveInputValidator,
            IValidator<SickLeaveUpdateInput> sickLeaveUpdateInputValidator
            )
        {
            Field<NonNullGraphType<SickLeaveType>, SickLeaveModel>()
              .Name("Create")
              .Argument<NonNullGraphType<SickLeaveCreateInputType>, SickLeaveCreateInput>("SickLeaveCreateInputType", "")
              .ResolveAsync(async context =>
              {
                  var sickLeaveInput = context.GetArgument<SickLeaveCreateInput>("SickLeaveCreateInputType");
                  sickLeaveInputValidator.ValidateAndThrow(sickLeaveInput);

                  var sickLeave = sickLeaveInput.ToModel();

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
                        throw new ExecutionError("You can not remove sick leave days");

                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.NoteTheAbsenceAndVacation))
                        throw new ExecutionError("You do not have permissions for remove sick leave days");

                   await sickLeaveRepository.RemoveAsync(id);

                   return true;
               })
               .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<SickLeaveType>, SickLeaveModel>()
              .Name("Update")
              .Argument<NonNullGraphType<SickLeaveUpdateInputType>, SickLeaveUpdateInput>("SickLeaveUpdateInputType", "")
              .ResolveAsync(async context =>
              {
                  var sickLeaveUpdateInput = context.GetArgument<SickLeaveUpdateInput>("SickLeaveUpdateInputType");
                  sickLeaveUpdateInputValidator.ValidateAndThrow(sickLeaveUpdateInput);

                  var sickLeave = sickLeaveUpdateInput.ToModel();
                  sickLeave = await sickLeaveRepository.UpdateAsync(sickLeave);

                  return await sickLeaveRepository.GetByIdAsync(sickLeave.Id);

              })
              .AuthorizeWith(AuthPolicies.Authenticated);

        }
    }
}
