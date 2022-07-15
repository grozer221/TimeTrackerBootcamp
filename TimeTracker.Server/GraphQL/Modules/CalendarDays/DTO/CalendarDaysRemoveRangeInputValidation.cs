using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO
{
    public class CalendarDaysRemoveRangeInputValidation : AbstractValidator<CalendarDaysRemoveRangeInput>
    {
        public CalendarDaysRemoveRangeInputValidation()
        {
            RuleFor(l => l.From)
              .NotNull();
            
            RuleFor(l => l.To)
              .NotNull()
              .Must((input, to) =>
              {
                  var result = DateTime.Compare(input.From, input.To);
                  return result < 1;
              }).WithMessage("From must be greater than To");

            RuleFor(l => l.DaysOfWeek)
               .NotNull()
               .Must((input, dayOfWeeks) =>
               {
                   return dayOfWeeks.Count() > 0;
               }).WithMessage("You must specify days of weeks");
        }
    }
}
