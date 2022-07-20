using FluentValidation;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO
{
    public class CalendarDaysCreateInputValidator : AbstractValidator<CalendarDaysCreateInput>
    {
        public CalendarDaysCreateInputValidator(ICalendarDayManager calendarDayManager)
        {
            RuleFor(l => l.Title);

            RuleFor(l => l.Date)
                .NotNull()
                .MustAsync(async (input, date, cancellationToken) =>
                {
                    var exists = await calendarDayManager.GetByDateAsync(date) != null;
                    if (input.Override && exists)
                        await calendarDayManager.RemoveAsync(date);
                    return !exists;
                }).WithMessage(input => $"Calendar day for {input.Date.ToString("yyyy-MM-dd")} already exists");
            
            RuleFor(l => l.Kind)
                .NotNull()
                .Must((input, kind) =>
                {
                    if (kind == DayKind.DayOff)
                        return input.PercentageWorkHours == 0;
                    return true;
                }).WithMessage("In day off or holiday - percentage work hours must be 0");

            RuleFor(l => l.PercentageWorkHours)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(100);
        }
    }
}
