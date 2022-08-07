using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave.DTO
{
    public class SickLeaveGetInputTypeValidator : AbstractValidator<SickLeaveGetInput>
    {
        public SickLeaveGetInputTypeValidator()
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
