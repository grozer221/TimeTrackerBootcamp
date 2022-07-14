using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO
{
    public class CalendarDaysCreateInput : IModelable<CalendarDayModel>
    {
        public DateTime Date { get; set; }
        public DayKind Kind { get; set; }
        public int PercentageWorkHours { get; set; }

        public CalendarDayModel ToModel()
        {
            return new CalendarDayModel
            {
                Date = this.Date,
                Kind = this.Kind,
                PercentageWorkHours = this.PercentageWorkHours,
            };
        }
    }

    public class CalendarDaysCreateInputType : InputObjectGraphType<CalendarDaysCreateInput>
    {
        public CalendarDaysCreateInputType()
        {
            Field<NonNullGraphType<DateGraphType>, DateTime>()
                 .Name("Date")
                 .Resolve(context => context.Source.Date);

            Field<NonNullGraphType<DayKindType>, DayKind>()
                 .Name("Kind")
                 .Resolve(context => context.Source.Kind);
            
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("PercentageWorkHours")
                 .Resolve(context => context.Source.PercentageWorkHours);
        }
    }
}
