using GraphQL;
using GraphQL.Types;
using Microsoft.Extensions.Caching.Memory;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth.DTO;
using TimeTracker.Server.Services;

namespace TimeTracker.Server.GraphQL.Modules.Auth
{
    public class AuthQueries : ObjectGraphType
    {
        public AuthQueries(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache, IUserRepository userRepository, AuthService authService)
        {
            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Me")
                .ResolveAsync(async context =>
                {
                    var userId = httpContextAccessor.HttpContext.GetUserId();
                    string key = $"users/{userId}";
                    UserModel currentUser;
                    if (!memoryCache.TryGetValue(key, out currentUser))
                    {
                        currentUser = await userRepository.GetByIdAsync(userId);
                        memoryCache.Set(key, currentUser, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1)));
                    }
                    return new AuthResponse()
                    {
                        Token = authService.GenerateAccessToken(currentUser.Id, currentUser.Email, currentUser.RoleEnum),
                        User = currentUser,
                    };
                })
                .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
