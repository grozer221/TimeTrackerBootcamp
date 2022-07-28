using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsGetInputValidator : AbstractValidator<VacationRequestsGetInput>
    {
        public VacationRequestsGetInputValidator()
        {
            RuleFor(l => l.PageNumber)
                .NotEmpty()
                .NotNull()
                .GreaterThanOrEqualTo(1);
            
            RuleFor(l => l.PageSize)
                .NotEmpty()
                .NotNull()
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(100);
        }
    }
}
