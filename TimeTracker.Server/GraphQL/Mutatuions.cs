using GraphQL.Types;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.GraphQL
{
    public class Mutations : ObjectGraphType
    {
        public Mutations()
        {
            Field<AuthMutations>()
                .Name("Auth")
                .Resolve(_ => new { });
        }
    }
}
