using FluentValidation;
using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthRequestResetPasswordInputValidation : AbstractValidator<AuthRequestResetPasswordInput>
    {
        public AuthRequestResetPasswordInputValidation()
        {
            RuleFor(l => l.Email)
                .NotEmpty()
                .NotNull()
                .EmailAddress();
        }
    }
}
