using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsTasksUpdate
{
    public class SettingsTasksUpdateInput : IModelable<SettingsTasks>
    {
        public TimeOnly AutoSetWorkingHoursForFullTimers { get; set; }
        public SettingsTasksAutoCreateDaysOffInput AutoCreateDaysOff { get; set; }

        public SettingsTasks ToModel()
        {
            var autoSetWorkingHoursForFullTimersDateTime = new DateTime(2022, 1, 1);
            autoSetWorkingHoursForFullTimersDateTime += AutoSetWorkingHoursForFullTimers.ToTimeSpan();
            return new SettingsTasks
            {
                AutoSetWorkingHoursForFullTimers = autoSetWorkingHoursForFullTimersDateTime,
                AutoCreateDaysOff = this.AutoCreateDaysOff.ToModel(),
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
            
            Field<SettingsTasksAutoCreateDaysOffInputType, SettingsTasksAutoCreateDaysOffInput>()
                 .Name("AutoCreateDaysOff")
                 .Resolve(context => context.Source.AutoCreateDaysOff);
        }
    }
}
