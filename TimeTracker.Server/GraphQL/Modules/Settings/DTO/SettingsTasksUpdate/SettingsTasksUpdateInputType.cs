using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsTasksUpdate
{
    public class SettingsTasksUpdateInput : IModelable<SettingsTasks>
    {
        public SettingsTasksAutoSetWorkingHoursForFullTimersInput AutoSetWorkingHoursForFullTimers { get; set; }
        public SettingsTasksAutoCreateDaysOffInput AutoCreateDaysOff { get; set; }

        public SettingsTasks ToModel()
        {
            return new SettingsTasks
            {
                AutoSetWorkingHoursForFullTimers = this.AutoSetWorkingHoursForFullTimers.ToModel(),
                AutoCreateDaysOff = this.AutoCreateDaysOff.ToModel(),
            };
        }
    }

    public class SettingsTasksUpdateInputType : InputObjectGraphType<SettingsTasksUpdateInput>
    {
        public SettingsTasksUpdateInputType()
        {
            Field<SettingsTasksAutoSetWorkingHoursForFullTimersInputType, SettingsTasksAutoSetWorkingHoursForFullTimersInput>()
                 .Name("AutoSetWorkingHoursForFullTimers")
                 .Resolve(context => context.Source.AutoSetWorkingHoursForFullTimers);
            
            Field<SettingsTasksAutoCreateDaysOffInputType, SettingsTasksAutoCreateDaysOffInput>()
                 .Name("AutoCreateDaysOff")
                 .Resolve(context => context.Source.AutoCreateDaysOff);
        }
    }
}
