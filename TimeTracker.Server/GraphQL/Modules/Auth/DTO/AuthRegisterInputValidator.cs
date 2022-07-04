using FluentValidation;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthRegisterInputValidator : AbstractValidator<AuthRegisterInput>
    {
        public AuthRegisterInputValidator(IUserRepository userRepository)
        {
            RuleFor(l => l.Email)
                .EmailAddress()
                .NotEmpty()
                .NotNull()
                .MustAsync(async (email, cancellation) =>
                {
                    var user = await userRepository.GetByEmailAsync(email);
                    return user == null ? true : false;
                }).WithMessage("Email already taken");

            RuleFor(l => l.Password)
                .MinimumLength(5)
                .NotEmpty()
                .NotNull();
            
            RuleFor(l => l.FirstName)
                .NotEmpty()
                .NotNull();
            
            RuleFor(l => l.LastName)
                .NotEmpty()
                .NotNull();
            
            RuleFor(l => l.MiddleName)
                .NotEmpty()
                .NotNull();
        }
    }
}
