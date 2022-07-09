using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Users.DTO;

namespace TimeTracker.Server.GraphQL.Modules.Users
{
    public class UsersMutations : ObjectGraphType
    {
        public UsersMutations(IUserRepository userRepository)
        {
            Field<NonNullGraphType<UserType>, UserModel>()
               .Name("Create")
               .Argument<NonNullGraphType<UsersCreateInputType>, UsersCreateInput>("UsersCreateInputType", "Argument for create user")
               .ResolveAsync(async context =>
               {
                   var usersCreateInput = context.GetArgument<UsersCreateInput>("UsersCreateInputType");
                   await new UsersCreateInputValidation(userRepository).ValidateAndThrowExceptionsAsync(usersCreateInput);
                   var user = usersCreateInput.ToModel();
                   return await userRepository.CreateAsync(user);
               })
               .AuthorizeWith(AuthPolicies.Administrator);
            
            Field<NonNullGraphType<UserType>, UserModel>()
               .Name("Update")
               .Argument<NonNullGraphType<UsersUpdateInputType>, UsersUpdateInput>("UsersUpdateInputType", "Argument for update user")
               .ResolveAsync(async context =>
               {
                   var usersUpdateInput = context.GetArgument<UsersUpdateInput>("UsersUpdateInputType");
                   await new UsersUpdateInputValidation(userRepository).ValidateAndThrowExceptionsAsync(usersUpdateInput);
                   var user = usersUpdateInput.ToModel();
                   return await userRepository.UpdateAsync(user);
               })
               .AuthorizeWith(AuthPolicies.Administrator);
            
            Field<NonNullGraphType<UserType>, UserModel>()
               .Name("Remove")
               .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Argument for remove user")
               .ResolveAsync(async context =>
               {
                   var id = context.GetArgument<Guid>("Id");
                   var user = await userRepository.GetByIdAsync(id);
                   if (user == null)
                       throw new ExecutionError("User not found");
                   await userRepository.RemoveAsync(id);
                   return user;
               })
               .AuthorizeWith(AuthPolicies.Administrator);
        }
    }
}
