using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes.SettingsTasksCategoriesTypes
{
    public class SettingsTasksAutoCreateDaysOffType : ObjectGraphType<SettingsTasksAutoCreateDaysOff>
    {
        public SettingsTasksAutoCreateDaysOffType()
        {
            Field<BooleanGraphType, bool>()
               .Name("IsEnabled")
               .Resolve(context => context.Source.IsEnabled);
            
            Field<DayOfWeekType, DayOfWeek>()
               .Name("DayOfWeekWhenCreate")
               .Resolve(context => context.Source.DayOfWeekWhenCreate);
            
            Field<DateTimeGraphType, DateTime>()
               .Name("TimeWhenCreate")
               .Resolve(context => context.Source.TimeWhenCreate);

            Field<ListGraphType<DayOfWeekType>, IEnumerable<DayOfWeek>>()
                .Name("DaysOfWeek")
                .Resolve(context => context.Source.DaysOfWeek);
        }
    }
}
