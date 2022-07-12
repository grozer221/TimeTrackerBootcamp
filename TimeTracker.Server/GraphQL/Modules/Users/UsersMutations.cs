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
        public UsersMutations(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            Field<NonNullGraphType<UserType>, UserModel>()
               .Name("Create")
               .Argument<NonNullGraphType<UsersCreateInputType>, UsersCreateInput>("UsersCreateInputType", "Argument for create user")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateUsers))
                       throw new ExecutionError("You do not have permissions for create user");
                   var usersCreateInput = context.GetArgument<UsersCreateInput>("UsersCreateInputType");
                   await new UsersCreateInputValidation(userRepository).ValidateAndThrowExceptionsAsync(usersCreateInput);
                   var user = usersCreateInput.ToModel();
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
                   await new UsersUpdateInputValidation(userRepository).ValidateAndThrowExceptionsAsync(usersUpdateInput);
                   var user = usersUpdateInput.ToModel();
                   return await userRepository.UpdateAsync(user);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
            
            Field<NonNullGraphType<UserType>, UserModel>()
               .Name("Remove")
               .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Argument for remove user")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateUsers))
                       throw new ExecutionError("You do not have permissions for remove user");
                   var id = context.GetArgument<Guid>("Id");
                   return await userRepository.RemoveAsync(id);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
