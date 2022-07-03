using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Modules.Auth.DTO;

namespace TimeTracker.Server.GraphQL.Modules.Auth
{
    public class AuthQueries : ObjectGraphType
    {
        public AuthQueries()
        {
            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Me")
                .ResolveAsync(async context =>
                {
                    return new AuthResponse()
                    {
                        Token = "",
                        User = new UserModel(),
                    };
                });
        }
    }
}
