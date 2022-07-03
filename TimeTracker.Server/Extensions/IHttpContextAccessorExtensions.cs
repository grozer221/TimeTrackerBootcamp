using TimeTracker.Business.Enums;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.Extensions
{
    public static class IHttpContextAccessorExtensions
    {
        public static Guid GetUserId(this HttpContext httpContext)
        {
            return new Guid(httpContext.User.Claims.First(c => c.Type == AuthClaimsIdentity.DefaultIdClaimType).Value);
        }

        public static string GetUserEmail(this HttpContext httpContext)
        {
            return httpContext.User.Claims.First(c => c.Type == AuthClaimsIdentity.DefaultEmailClaimType).Value;
        }

        public static Role GetRole(this HttpContext httpContext)
        {
            Role role;
            if (!Enum.TryParse(httpContext.User.Claims.First(c => c.Type == AuthClaimsIdentity.DefaultRoleClaimType).Value, out role))
            {
                throw new Exception("Bad role");
            }
            return role;
        }
    }
}
