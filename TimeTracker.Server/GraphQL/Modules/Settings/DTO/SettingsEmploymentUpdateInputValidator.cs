using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsEmploymentUpdateInputValidator : AbstractValidator<SettingsEmploymentUpdateInput>
    {
        public SettingsEmploymentUpdateInputValidator()
        {
            RuleFor(l => l.WorkdayStartAt)
                .NotNull();
            
            RuleFor(l => l.HoursInWorkday)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(24);
        }
    }
}
