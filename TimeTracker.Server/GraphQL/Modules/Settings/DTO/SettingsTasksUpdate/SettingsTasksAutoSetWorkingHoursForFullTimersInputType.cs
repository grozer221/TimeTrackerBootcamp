using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsTasksUpdate
{
    public class SettingsTasksAutoSetWorkingHoursForFullTimersInput : IModelable<SettingsTasksAutoSetWorkingHoursForFullTimers>
    {
        public bool IsEnabled { get; set; }
        public TimeOnly TimeWhenCreate { get; set; }

        public SettingsTasksAutoSetWorkingHoursForFullTimers ToModel()
        {
            var TimeWhenCreateDateTime = new DateTime();
            TimeWhenCreateDateTime += TimeWhenCreate.ToTimeSpan();
            return new SettingsTasksAutoSetWorkingHoursForFullTimers
            {
                IsEnabled = this.IsEnabled,
                TimeWhenCreate = TimeWhenCreateDateTime,
            };
        }
    }

    public class SettingsTasksAutoSetWorkingHoursForFullTimersInputType : InputObjectGraphType<SettingsTasksAutoSetWorkingHoursForFullTimersInput>
    {
        public SettingsTasksAutoSetWorkingHoursForFullTimersInputType()
        {
            Field<NonNullGraphType<BooleanGraphType>, bool>()
                    .Name("IsEnabled")
                    .Resolve(context => context.Source.IsEnabled);

            Field<TimeOnlyGraphType, TimeOnly>()
                    .Name("TimeWhenCreate")
                    .Resolve(context => context.Source.TimeWhenCreate);
        }
    }
}
