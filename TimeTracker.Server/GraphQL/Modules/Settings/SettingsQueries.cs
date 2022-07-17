using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.GraphQL.Modules.Settings
{
    public class SettingsQueries : ObjectGraphType
    {
        public SettingsQueries(ISettingsRepository settingsRepository)
        {
            Field<NonNullGraphType<SettingsType>, SettingsModel>()
               .Name("Get")
               .ResolveAsync(async context => await settingsRepository.GetAsync())
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
