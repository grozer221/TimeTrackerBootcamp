using FluentValidation;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Settings.DTO;

namespace TimeTracker.Server.GraphQL.Modules.Settings
{
    public class SettingsMutations : ObjectGraphType
    {
        public SettingsMutations(
            ISettingsManager settingsManager,
            IHttpContextAccessor httpContextAccessor,
            IValidator<SettingsCommonUpdateInput> settingsCommonUpdateInputValidator)
        {
            Field<NonNullGraphType<SettingsType>, SettingsModel>()
               .Name("UpdateCommon")
               .Argument<NonNullGraphType<SettingsCommonUpdateInputType>, SettingsCommonUpdateInput>("SettingsCommonUpdateInputType", "Argument for update common settings")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateSettings))
                       throw new ExecutionError("You do not have permissions for update common settings");
                   var settingsCommonUpdateInput = context.GetArgument<SettingsCommonUpdateInput>("SettingsCommonUpdateInputType");
                   settingsCommonUpdateInputValidator.ValidateAndThrow(settingsCommonUpdateInput);
                   var settingsCommon = settingsCommonUpdateInput.ToModel();
                   return await settingsManager.UpdateCommonAsync(settingsCommon);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
