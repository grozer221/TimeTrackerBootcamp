using GraphQL;
using GraphQL.Types;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Net.Http.Headers;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth.DTO;
using TimeTracker.Server.Services;

namespace TimeTracker.Server.GraphQL.Modules.Auth
{
    public class AuthQueries : ObjectGraphType
    {
        public AuthQueries(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache, IUserRepository userRepository, ITokenRepository tokenRepository)
        {
            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Me")
                .ResolveAsync(async context =>
                {
                    var userId = httpContextAccessor.HttpContext.GetUserId();
                    return new AuthResponse()
                    {
                        Token = httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Authorization],
                        User = await userRepository.GetByIdAsync(userId),
                    };
                })
                .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
