using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave.DTO
{
    public class SickLeaveInputTypeValidator : AbstractValidator<SickLeaveCreateInput>
    {
        public SickLeaveInputTypeValidator()
        {
            RuleFor(l => l.StartDate)
                .NotNull()
                .Must((input, dateStart) =>
                {
                    var dateTimeNow = DateTime.Now;
                    var dateNow = new DateTime(dateTimeNow.Year, dateTimeNow.Month, dateTimeNow.Day);
                    var result = DateTime.Compare(dateNow, dateStart);
                    return result <= 0;
                }).WithMessage("Date start can not be in the past");

            RuleFor(l => l.EndDate)
                .NotNull()
                .Must((input, to) =>
                {
                    var result = DateTime.Compare(input.StartDate, input.EndDate);
                    return result < 0;
                }).WithMessage("Date end must be greater than date start");

            RuleFor(l => l.Comment);
        }
    }
}
