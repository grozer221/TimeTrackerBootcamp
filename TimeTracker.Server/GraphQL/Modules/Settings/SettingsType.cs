using GraphQL;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes;

namespace TimeTracker.Server.GraphQL.Modules.Settings
{
    public class SettingsType : BaseType<SettingsModel>
    {
        public SettingsType(IHttpContextAccessor httpContextAccessor) : base()
        {
            Field<SettingsEmploymentType, SettingsEmployment>()
               .Name("Employment")
               .Resolve(context => context.Source.Employment)
               .AuthorizeWith(AuthPolicies.Authenticated);

            Field<SettingsApplicationType, SettingsApplication>()
               .Name("Application")
               .Resolve(context => context.Source.Application);
            
            Field<SettingsTasksType, SettingsTasks>()
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
