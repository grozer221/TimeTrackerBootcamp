using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsCommonUpdateInputValidator : AbstractValidator<SettingsCommonUpdateInput>
    {
        public SettingsCommonUpdateInputValidator()
        {
            RuleFor(l => l.FullTimeHoursInWorkday)
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(24);
        }
    }
}
