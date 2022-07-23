using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsEmailUpdateInputValidator : AbstractValidator<SettingsEmailUpdateInput>
    {
        public SettingsEmailUpdateInputValidator()
        {
            RuleFor(l => l.Name);
            
            RuleFor(l => l.Address)
                .EmailAddress()
                .NotEmpty()
                .NotNull();
        }
    }
}
