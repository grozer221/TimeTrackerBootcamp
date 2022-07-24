using FluentValidation;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersCreateInputValidator : AbstractValidator<UsersCreateInput>
    {
        public UsersCreateInputValidator(IUserRepository userRepository)
        {
            RuleFor(l => l.Email)
                .EmailAddress()
                .NotEmpty()
                .NotNull()
                .MustAsync(async (email, cancellation) =>
                {
                    var user = await userRepository.GetByEmailAsync(email);
                    return user == null;
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
            
            RuleFor(l => l.Permissions)
                .NotNull()
                .Must(permissions =>
                {
                    return permissions.Count() == permissions.Distinct().Count();
                })
                .WithMessage("Permissions can not duplicate");

            RuleFor(l => l.UsersWhichCanApproveVocationRequestIds)
                .NotNull()
                .MustAsync(async (usersWhichCanApproveVocationRequestIds, _) =>
                {
                    foreach(var userWhichCanApproveVocationRequestId in usersWhichCanApproveVocationRequestIds)
                    {
                        var user = await userRepository.GetByIdAsync(userWhichCanApproveVocationRequestId);
                        if (user == null)
                            return false;
                    }
                    return true;
                })
                .WithMessage("One of users which can approve vocation request ids does not exists")
                .Must(usersWhichCanApproveVocationRequestIds =>
                {
                    return usersWhichCanApproveVocationRequestIds.Count() == usersWhichCanApproveVocationRequestIds.Distinct().Count();
                })
                .WithMessage("Users which can approve vocation request ids can not duplicate");
        }
    }
}
