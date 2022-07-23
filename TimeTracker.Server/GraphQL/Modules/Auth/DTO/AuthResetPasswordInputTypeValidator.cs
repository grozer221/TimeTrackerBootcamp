using FluentValidation;
using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthResetPasswordInputValidation : AbstractValidator<AuthResetPasswordInput>
    {
        public AuthResetPasswordInputValidation()
        {
            RuleFor(l => l.Password)
                .NotEmpty()
                .NotNull();

            RuleFor(l => l.Token)
                .NotEmpty()
                .NotNull();
        }
    }
}
