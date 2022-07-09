using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.GraphQL.Modules.Users
{
    public class UsersQueries : ObjectGraphType
    {
        public UsersQueries(IUserRepository userRepository)
        {
            Field<NonNullGraphType<GetEntitiesResponseType<UserType, UserModel>>, GetEntitiesResponse<UserModel>>()
               .Name("Get")
               .Argument<NonNullGraphType<StringGraphType>, string>("Like", "Argument for a search")
               .Argument<NonNullGraphType<IntGraphType>, int>("Take", "Argument represent count of tracks on page")
               .Argument<NonNullGraphType<IntGraphType>, int>("Skip", "Argument represnt page number")
               .ResolveAsync(async context =>
               {
                   var like = context.GetArgument<string>("Like");
                   var take = context.GetArgument<int>("Take");
                   var skip = context.GetArgument<int>("Skip");
                   return await userRepository.GetAsync(like, take, skip);
               })
               .AuthorizeWith(AuthPolicies.Administrator);

            Field<NonNullGraphType<UserType>, UserModel>()
                .Name("GetById")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Id of user")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    var user = await userRepository.GetByIdAsync(id);
                    if (user == null)
                        throw new ExecutionError("User not found");
                    return user;
                })
                .AuthorizeWith(AuthPolicies.Administrator);
        }
    }
}
