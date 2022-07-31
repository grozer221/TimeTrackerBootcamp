using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays
{
    public class CalendarDayType : BaseType<CalendarDayModel>
    {
        public CalendarDayType() : base()
        {
            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("Date")
               .Resolve(context => context.Source.Date);
            
            Field<StringGraphType, string?>()
               .Name("Title")
               .Resolve(context => context.Source.Title);

            Field<NonNullGraphType<DayKindType>, DayKind>()
               .Name("Kind")
               .Resolve(context => context.Source.Kind);
            
            Field<NonNullGraphType<IntGraphType>, int>()
               .Name("WorkHours")
               .Resolve(context => context.Source.WorkHours);
        }
    }
}
