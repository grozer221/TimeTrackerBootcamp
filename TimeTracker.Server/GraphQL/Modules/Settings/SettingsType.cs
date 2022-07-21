using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes;
using TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes.SettingsTasksTypes;

namespace TimeTracker.Server.GraphQL.Modules.Settings
{
    public class SettingsType : BaseType<SettingsModel>
    {
        public SettingsType(IHttpContextAccessor httpContextAccessor) : base()
        {
            Field<NonNullGraphType<SettingsEmploymentType>, SettingsEmployment>()
               .Name("Employment")
               .Resolve(context => context.Source.Employment)
               .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<SettingsApplicationType>, SettingsApplication>()
               .Name("Application")
               .Resolve(context => context.Source.Application);
            
            Field<NonNullGraphType<SettingsTasksType>, SettingsTasks>()
               .Name("Tasks")
               .Resolve(context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateSettings))
                       throw new ExecutionError("You do not have permissions for get tasks settings");
                   return context.Source.Tasks;
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
