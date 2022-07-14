using FluentValidation;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO
{
    public class CalendarDaysCreateInputValidation : AbstractValidator<CalendarDaysCreateInput>
    {
        public CalendarDaysCreateInputValidation(ICalendarDayRepository calendarDayRepository)
        {
            RuleFor(l => l.Date)
                .NotNull()
                .MustAsync(async (input, date, cancellationToken) =>
                {
                    return await calendarDayRepository.GetByDateAsync(date) == null;
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
