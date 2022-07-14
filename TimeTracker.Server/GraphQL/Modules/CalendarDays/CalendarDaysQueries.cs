using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays
{
    public class CalendarDaysQueries : ObjectGraphType
    {
        public CalendarDaysQueries(ICalendarDayRepository calendarDayRepository)
        {
            Field<NonNullGraphType<ListGraphType<CalendarDayType>>, IEnumerable<CalendarDayModel>>()
               .Name("Get")
               .Argument<NonNullGraphType<CalendarDaysGetInputType>, CalendarDaysGetInput>("CalendarDaysGetInputType", "Argument for get From calendar days")
               .ResolveAsync(async context =>
               {
                   var calendarDaysGetInput = context.GetArgument<CalendarDaysGetInput>("CalendarDaysGetInputType");
                   new CalendarDaysGetInputValidation().ValidateAndThrowExceptions(calendarDaysGetInput);
                   return await calendarDayRepository.GetAsync(calendarDaysGetInput.From, calendarDaysGetInput.To);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<CalendarDayType>, CalendarDayModel>()
                .Name("GetById")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Argument for get calendar day")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    var calendarDay = await calendarDayRepository.GetByIdAsync(id);
                    if (calendarDay == null)
                        throw new ExecutionError("Calendar day not found");
                    return calendarDay;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
