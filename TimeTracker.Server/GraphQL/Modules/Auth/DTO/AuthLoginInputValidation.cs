using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthLoginInputValidator : AbstractValidator<AuthLoginInput>
    {
        public AuthLoginInputValidator()
        {
            RuleFor(l => l.Email)
                .EmailAddress()
                .NotEmpty()
                .NotNull();
            
            RuleFor(l => l.Password)
                .MinimumLength(5)
                .NotEmpty()
                .NotNull();
        }
    }
}
