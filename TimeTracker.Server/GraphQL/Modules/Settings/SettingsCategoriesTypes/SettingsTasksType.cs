using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;

namespace TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes
{
    public class SettingsTasksType : ObjectGraphType<SettingsTasks>
    {
        public SettingsTasksType()
        {
            Field<TimeOnlyGraphType, TimeOnly>()
               .Name("AutoSetWorkingHoursForFullTimers")
               .Resolve(context => TimeOnly.FromDateTime(context.Source.AutoSetWorkingHoursForFullTimers));
        }
    }
}
