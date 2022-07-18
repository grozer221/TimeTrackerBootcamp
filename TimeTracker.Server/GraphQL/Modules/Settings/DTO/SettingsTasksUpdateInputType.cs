using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsTasksUpdateInput : IModelable<SettingsTasks>
    {
        public TimeOnly AutoSetWorkingHoursForFullTimers { get; set; }

        public SettingsTasks ToModel()
        {
            var autoSetWorkingHoursForFullTimersDateTime = new DateTime(2022, 1, 1);
            autoSetWorkingHoursForFullTimersDateTime += AutoSetWorkingHoursForFullTimers.ToTimeSpan();
            return new SettingsTasks
            {
                AutoSetWorkingHoursForFullTimers = autoSetWorkingHoursForFullTimersDateTime,
            };
        }
    }

    public class SettingsTasksUpdateInputType : InputObjectGraphType<SettingsTasksUpdateInput>
    {
        public SettingsTasksUpdateInputType()
        {
            Field<TimeOnlyGraphType, TimeOnly>()
                 .Name("AutoSetWorkingHoursForFullTimers")
                 .Resolve(context => context.Source.AutoSetWorkingHoursForFullTimers);
        }
    }
}
