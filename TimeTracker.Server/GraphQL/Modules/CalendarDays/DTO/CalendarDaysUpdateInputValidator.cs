using FluentValidation;
using TimeTracker.Business.Enums;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO
{
    public class CalendarDaysUpdateInputValidator : AbstractValidator<CalendarDaysUpdateInput>
    {
        public CalendarDaysUpdateInputValidator()
        {
            RuleFor(l => l.Id)
                .NotEmpty()
                .NotNull();
            
            RuleFor(l => l.Date)
                .NotNull();
            
            RuleFor(l => l.Kind)
                .NotNull()
                .Must((input, kind) =>
                {
                    if (kind == DayKind.DayOff)
                        return input.PercentageWorkHours == 0;
                    return true;
                }).WithMessage("In day off percentage work hours must be 0");

            RuleFor(l => l.PercentageWorkHours)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(100);
        }
    }
}
