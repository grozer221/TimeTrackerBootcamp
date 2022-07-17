using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Business.Models.Settings;

namespace TimeTracker.Server.GraphQL.Modules.Settings
{
    public class SettingsCommonType : ObjectGraphType<SettingsCommon>
    {
        public SettingsCommonType()
        {
            Field<IntGraphType, int>()
               .Name("HoursInWorkday")
               .Resolve(context => context.Source.HoursInWorkday);
        }
    }
}
