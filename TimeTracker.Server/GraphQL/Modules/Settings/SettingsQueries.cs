using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.GraphQL.Modules.Settings
{
    public class SettingsQueries : ObjectGraphType
    {
        public SettingsQueries(ISettingsRepository settingsRepository,ISettingsManager settingsManager)
        {
            Field<NonNullGraphType<SettingsType>, SettingsModel>()
               .Name("Get")
               .ResolveAsync(async context => await settingsManager.GetAsync())
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
