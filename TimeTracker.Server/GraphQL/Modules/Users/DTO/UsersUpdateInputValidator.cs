using FluentValidation;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersUpdateInputValidator : AbstractValidator<UsersUpdateInput>
    {
        public UsersUpdateInputValidator(IUserRepository userRepository)
        {
            RuleFor(l => l.Id)
              .NotEmpty()
              .NotNull();

            RuleFor(l => l.Email)
                .EmailAddress()
                .NotEmpty()
                .NotNull()
                .MustAsync(async (user, email, cancellation) =>
                {
                    var checkUser = await userRepository.GetByEmailAsync(user.Email);
                    return checkUser == null || checkUser.Id == user.Id;
                }).WithMessage("Email already taken");

            RuleFor(l => l.FirstName)
                .NotEmpty()
                .NotNull();

            RuleFor(l => l.LastName)
                .NotEmpty()
                .NotNull();

            RuleFor(l => l.MiddleName)
                .NotEmpty()
                .NotNull();

            RuleFor(l => l.Permissions);
        }
    }
}
