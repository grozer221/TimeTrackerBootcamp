using GraphQL.Types;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO
{
    public class CalendarDaysGetInput
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }

    public class CalendarDaysGetInputType : InputObjectGraphType<CalendarDaysGetInput>
    {
        public CalendarDaysGetInputType()
        {
            Field<NonNullGraphType<DateGraphType>, DateTime>()
                 .Name("From")
                 .Resolve(context => context.Source.From);

            Field<NonNullGraphType<DateGraphType>, DateTime>()
                 .Name("To")
                 .Resolve(context => context.Source.To);
        }
    }
}
