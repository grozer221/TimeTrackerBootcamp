﻿using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.CalendarDays.DTO
{
    public class CalendarDaysGetInputValidation : AbstractValidator<CalendarDaysGetInput>
    {
        public CalendarDaysGetInputValidation()
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
        }
    }
}
