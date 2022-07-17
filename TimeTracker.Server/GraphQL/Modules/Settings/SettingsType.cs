using TimeTracker.Business.Models;
using TimeTracker.Business.Models.Settings;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings
{
    public class SettingsType : BaseType<SettingsModel>
    {
        public SettingsType() : base()
        {
            Field<SettingsCommonType, SettingsCommon>()
               .Name("Common")
               .Resolve(context => context.Source.Common);
        }
    }
}
