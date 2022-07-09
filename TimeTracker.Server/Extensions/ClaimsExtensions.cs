using System.Security.Claims;
using TimeTracker.Business.Enums;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.Extensions
{
    public static class ClaimExtensions
    {
        public static Guid GetUserId(this IEnumerable<Claim> claims)
        {
            return new Guid(claims.First(c => c.Type == AuthClaimsIdentity.DefaultIdClaimType).Value);
        }

        public static string GetUserEmail(this IEnumerable<Claim> claims)
        {
            return claims.First(c => c.Type == AuthClaimsIdentity.DefaultEmailClaimType).Value;
        }

        public static Role GetRole(this IEnumerable<Claim> claims)
        {
            Role role;
            if (!Enum.TryParse(claims.First(c => c.Type == AuthClaimsIdentity.DefaultRoleClaimType).Value, out role))
            {
                throw new Exception("Bad role");
            }
            return role;
        }
    }
}
