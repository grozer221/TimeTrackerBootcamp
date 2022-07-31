using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsTasksUpdate
{
    public class SettingsTasksAutoCreateDaysOffInput : IModelable<SettingsTasksAutoCreateDaysOff>
    {
        public bool IsEnabled { get; set; }
        public DayOfWeek DayOfWeekWhenCreate { get; set; }
        public TimeOnly TimeWhenCreate { get; set; }
        public List<DayOfWeek> DaysOfWeek { get; set; }

        public SettingsTasksAutoCreateDaysOff ToModel()
        {
            var timeWhenCreateDateTime = new DateTime();
            timeWhenCreateDateTime += TimeWhenCreate.ToTimeSpan();
            return new SettingsTasksAutoCreateDaysOff
            {
                IsEnabled = this.IsEnabled,
                DayOfWeekWhenCreate = this.DayOfWeekWhenCreate,
                TimeWhenCreate = timeWhenCreateDateTime,
                DaysOfWeek = this.DaysOfWeek,
            };
        }
    }

    public class SettingsTasksAutoCreateDaysOffInputType : InputObjectGraphType<SettingsTasksAutoCreateDaysOffInput>
    {
        public SettingsTasksAutoCreateDaysOffInputType()
        {
            Field<NonNullGraphType<BooleanGraphType>, bool>()
                    .Name("IsEnabled")
                    .Resolve(context => context.Source.IsEnabled);

            Field<DayOfWeekType, DayOfWeek>()
                    .Name("DayOfWeekWhenCreate")
                    .Resolve(context => context.Source.DayOfWeekWhenCreate);

            Field<TimeOnlyGraphType, TimeOnly>()
                    .Name("TimeWhenCreate")
                    .Resolve(context => context.Source.TimeWhenCreate);

            Field<ListGraphType<DayOfWeekType>, IEnumerable<DayOfWeek>>()
                    .Name("DaysOfWeek")
                    .Resolve(context => context.Source.DaysOfWeek);
        }
    }
}
