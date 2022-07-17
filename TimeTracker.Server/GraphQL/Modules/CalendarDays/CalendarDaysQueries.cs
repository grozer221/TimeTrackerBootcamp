using FluentValidation;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays
{
    public class CalendarDaysQueries : ObjectGraphType
    {
        public CalendarDaysQueries(
            ICalendarDayRepository calendarDayRepository,
            IValidator<CalendarDaysGetInput> calendarDaysGetInputValidation)
        {
            Field<NonNullGraphType<ListGraphType<CalendarDayType>>, IEnumerable<CalendarDayModel>>()
               .Name("Get")
               .Argument<NonNullGraphType<CalendarDaysGetInputType>, CalendarDaysGetInput>("CalendarDaysGetInputType", "Argument for get From calendar days")
               .ResolveAsync(async context =>
               {
                   var calendarDaysGetInput = context.GetArgument<CalendarDaysGetInput>("CalendarDaysGetInputType");
                   calendarDaysGetInputValidation.ValidateAndThrow(calendarDaysGetInput);
                   return await calendarDayRepository.GetAsync(calendarDaysGetInput.From, calendarDaysGetInput.To);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<CalendarDayType>, CalendarDayModel>()
                .Name("GetById")
                .Argument<NonNullGraphType<DateGraphType>, DateTime>("Date", "Argument for get calendar day")
                .ResolveAsync(async context =>
                {
                    var date = context.GetArgument<DateTime>("Date");
                    var calendarDay = await calendarDayRepository.GetByDateAsync(date);
                    if (calendarDay == null)
                        throw new ExecutionError("Calendar day not found");
                    return calendarDay;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
