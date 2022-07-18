using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Abstraction;
using TimeTracker.Business.Enums;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.GraphQL.Modules.Cache
{
    public class CacheMutations : ObjectGraphType
    {
        public CacheMutations(IHttpContextAccessor httpContextAccessor, IEnumerable<IManager> managers)
        {
            Field<NonNullGraphType<BooleanGraphType>, bool>()
               .Name("RefreshApp")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.IsAdministratorOrHavePermissions(Permission.ClearCache))
                       throw new ExecutionError("You do not have permissions for clear cache");

                   foreach(var manager in managers)
                       manager.ResetCache();
                   return true;
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
