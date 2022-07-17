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
               .Name("FullTimeHoursInWorkday")
               .Resolve(context => context.Source.FullTimeHoursInWorkday);
        }
    }
}
