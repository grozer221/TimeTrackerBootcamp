using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsVacationRequestsUpdateInputValidator : AbstractValidator<SettingsVacationRequestsUpdateInput>
    {
        public SettingsVacationRequestsUpdateInputValidator()
        {
            RuleFor(l => l.AmountDaysPerYear)
                .NotNull()
                .GreaterThanOrEqualTo(0);
        }
    }
}
