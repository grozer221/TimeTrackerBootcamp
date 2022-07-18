using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsApplicationUpdateInputValidator : AbstractValidator<SettingsApplicationUpdateInput>
    {
        public SettingsApplicationUpdateInputValidator()
        {
            RuleFor(i => i.Title);

            RuleFor(i => i.FaviconUrl)
                .Must(faviconUrl => Uri.TryCreate(faviconUrl, UriKind.Absolute, out _))
                .When(x => !string.IsNullOrEmpty(x.FaviconUrl))
                .WithMessage("Favicon url must be url");

            RuleFor(i => i.LogoUrl)
                .Must(v => Uri.TryCreate(v, UriKind.Absolute, out _))
                .When(v => !string.IsNullOrEmpty(v.LogoUrl))
                .WithMessage("Logo url must be url"); ;
        }
    }
}
