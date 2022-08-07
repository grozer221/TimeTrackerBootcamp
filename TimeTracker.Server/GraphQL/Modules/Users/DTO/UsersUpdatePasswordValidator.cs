using FluentValidation;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersUpdatePasswordValidator : AbstractValidator<UsersUpdatePasswordInput>
    {
        public UsersUpdatePasswordValidator(IUserRepository userRepository)
        {

            RuleFor(l => l.Id)
                .NotEmpty()
                .NotNull()
                .MustAsync(async (user, id, cancellation) =>
                {
                    var checkUser = await userRepository.GetByIdAsync(user.Id);
                    return checkUser != null;
                }).WithMessage("User with that id not exist!");

            RuleFor(l => l.Password)
                .NotEmpty()
                .NotNull();

            RuleFor(l => l.ConfirmPassword)
                .NotEmpty()
                .NotNull()
                .Must((user, confirmPassword) => 
                {
                    return confirmPassword == user.Password;
                });
        }
    }
}
