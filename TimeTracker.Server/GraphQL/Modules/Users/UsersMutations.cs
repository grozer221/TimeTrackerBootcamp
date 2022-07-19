using FluentValidation;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Users.DTO;

namespace TimeTracker.Server.GraphQL.Modules.Users
{
    public class UsersMutations : ObjectGraphType
    {
        public UsersMutations(
            IUserRepository userRepository, 
            IHttpContextAccessor httpContextAccessor,
            IValidator<UsersCreateInput> usersCreateInputValidator,
            IValidator<UsersUpdateInput> usersUpdateInputValidator,
            IValidator<UsersRemoveInput> usersRemoveInputValidator)
        {
            Field<NonNullGraphType<UserType>, UserModel>()
               .Name("Create")
               .Argument<NonNullGraphType<UsersCreateInputType>, UsersCreateInput>("UsersCreateInputType", "Argument for create user")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateUsers))
                       throw new ExecutionError("You do not have permissions for create user");
                   var usersCreateInput = context.GetArgument<UsersCreateInput>("UsersCreateInputType");
                   await usersCreateInputValidator.ValidateAndThrowAsync(usersCreateInput);
                   var user = usersCreateInput.ToModel();
                   user.Password = user.Password.CreateMD5WithSalt(out var salt);
                   user.Salt = salt;
                   return await userRepository.CreateAsync(user);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
            
            Field<NonNullGraphType<UserType>, UserModel>()
               .Name("Update")
               .Argument<NonNullGraphType<UsersUpdateInputType>, UsersUpdateInput>("UsersUpdateInputType", "Argument for update user")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateUsers))
                       throw new ExecutionError("You do not have permissions for update user");
                   var usersUpdateInput = context.GetArgument<UsersUpdateInput>("UsersUpdateInputType");
                   await usersUpdateInputValidator.ValidateAndThrowAsync(usersUpdateInput);
                   var user = usersUpdateInput.ToModel();
                   return await userRepository.UpdateAsync(user);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
            
            Field<NonNullGraphType<UserType>, UserModel>()
               .Name("Remove")
               .Argument<NonNullGraphType<UsersRemoveInputType>, UsersRemoveInput>("UsersRemoveInputType", "Argument for remove user")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateUsers))
                       throw new ExecutionError("You do not have permissions for remove user");
                   var usersRemoveInput = context.GetArgument<UsersRemoveInput>("UsersRemoveInputType");
                   await usersRemoveInputValidator.ValidateAndThrowAsync(usersRemoveInput);
                   return await userRepository.RemoveAsync(usersRemoveInput.Email);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
