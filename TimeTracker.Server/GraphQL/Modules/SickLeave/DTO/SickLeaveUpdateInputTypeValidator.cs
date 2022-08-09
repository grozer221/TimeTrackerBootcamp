using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave.DTO
{
    public class SickLeaveUpdateInputTypeValidator : AbstractValidator<SickLeaveUpdateInput>
    {
        public SickLeaveUpdateInputTypeValidator()
        {
            RuleFor(l => l.Id)
                .NotNull();

            RuleFor(l => l.StartDate)
                .Must((input, dateStart) =>
                {
                    var dateTimeNow = DateTime.Now;
                    var dateNow = new DateTime(dateTimeNow.Year, dateTimeNow.Month, dateTimeNow.Day);
                    var result = DateTime.Compare(dateNow, dateStart.Value);
                    return result <= 0;
                }).WithMessage("Date start can not be in the past");

            RuleFor(l => l.EndDate)
                .Must((input, to) =>
                {
                    var result = DateTime.Compare(input.StartDate.Value, input.EndDate.Value);
                    return result < 0;
                }).WithMessage("Date end must be greater than date start");

            RuleFor(l => l.Comment);
        }
    }
}
