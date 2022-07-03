using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Modules.Users;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthResponseType : ObjectGraphType<AuthResponse>
    {
        public AuthResponseType()
        {
            Field<NonNullGraphType<UserType>, UserModel>()
                .Name("User")
                .Resolve(context => context.Source.User);

            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("Token")
                .Resolve(context => context.Source.Token);
        }
    }
}
