using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO
{
    public class CalendarDaysCreateInput : IModelable<CalendarDayModel>
    {
        public string? Title { get; set; }
        public DateTime Date { get; set; }
        public DayKind Kind { get; set; }
        public int WorkHours { get; set; }
        public bool Override { get; set; }

        public CalendarDayModel ToModel()
        {
            return new CalendarDayModel
            {
                Title = this.Title,
                Date = this.Date,
                Kind = this.Kind,
                WorkHours = this.WorkHours,
            };
        }
    }

    public class CalendarDaysCreateInputType : InputObjectGraphType<CalendarDaysCreateInput>
    {
        public CalendarDaysCreateInputType()
        {
            Field<StringGraphType, string?>()
                 .Name("Title")
                 .Resolve(context => context.Source.Title);
            
            Field<NonNullGraphType<DateGraphType>, DateTime>()
                 .Name("Date")
                 .Resolve(context => context.Source.Date);

            Field<NonNullGraphType<DayKindType>, DayKind>()
                 .Name("Kind")
                 .Resolve(context => context.Source.Kind);
            
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("WorkHours")
                 .Resolve(context => context.Source.WorkHours);
            
            Field<NonNullGraphType<BooleanGraphType>, bool>()
                 .Name("Override")
                 .Resolve(context => context.Source.Override);
        }
    }
}
