using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthResetPasswordInputValidation : AbstractValidator<AuthResetPasswordInput>
    {
        public AuthResetPasswordInputValidation()
        {
            RuleFor(l => l.Password)
                .MinimumLength(5)
                .NotEmpty()
                .NotNull();

            RuleFor(l => l.Token)
                .NotEmpty()
                .NotNull();
        }
    }
}
