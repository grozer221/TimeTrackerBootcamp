using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsCommonUpdateInputValidator : AbstractValidator<SettingsCommonUpdateInput>
    {
        public SettingsCommonUpdateInputValidator()
        {
            RuleFor(l => l.HoursInWorkday)
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(24);
        }
    }
}
