using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes.SettingsTasksCategoriesTypes;

namespace TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes.SettingsTasksTypes
{
    public class SettingsTasksType : ObjectGraphType<SettingsTasks>
    {
        public SettingsTasksType()
        {
            Field<SettingsTasksAutoSetWorkingHoursForFullTimersType, SettingsTasksAutoSetWorkingHoursForFullTimers>()
               .Name("AutoSetWorkingHoursForFullTimers")
               .Resolve(context => context.Source.AutoSetWorkingHoursForFullTimers);

            Field<SettingsTasksAutoCreateDaysOffType, SettingsTasksAutoCreateDaysOff?>()
               .Name("AutoCreateDaysOff")
               .Resolve(context => context.Source.AutoCreateDaysOff);
        }
    }
}
