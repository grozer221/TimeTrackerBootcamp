using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;

namespace TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes.SettingsTasksCategoriesTypes
{
    public class SettingsTasksAutoSetWorkingHoursForFullTimersType : ObjectGraphType<SettingsTasksAutoSetWorkingHoursForFullTimers>
    {
        public SettingsTasksAutoSetWorkingHoursForFullTimersType()
        {
            Field<BooleanGraphType, bool>()
               .Name("IsEnabled")
               .Resolve(context => context.Source.IsEnabled);
            
            Field<TimeOnlyGraphType, TimeOnly>()
               .Name("TimeWhenCreate")
               .Resolve(context => TimeOnly.FromDateTime(context.Source.TimeWhenCreate));
        }
    }
}
