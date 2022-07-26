using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsCreateInputValidator : AbstractValidator<VacationRequestsCreateInput>
    {
        public VacationRequestsCreateInputValidator()
        {
            RuleFor(l => l.DateStart)
                .NotNull()
                .Must((input, dateStart) =>
                {
                    var dateTimeNow = DateTime.Now;
                    var dateNow = new DateTime(dateTimeNow.Year, dateTimeNow.Month, dateTimeNow.Day);
                    var result = DateTime.Compare(dateNow, dateStart);
                    return result <= 0;
                }).WithMessage("Date start can not be in the past");

            RuleFor(l => l.DateEnd)
                .NotNull()
                .Must((input, to) =>
                {
                    var result = DateTime.Compare(input.DateStart, input.DateEnd);
                    return result < 1;
                }).WithMessage("Date end must be greater than date start");

            RuleFor(l => l.Comment);
        }
    }
}
