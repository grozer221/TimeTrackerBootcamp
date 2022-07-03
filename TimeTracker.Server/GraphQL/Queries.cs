using GraphQL.Types;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.GraphQL
{
    public class Queries : ObjectGraphType
    {
        public Queries()
        {
            Field<AuthQueries>()
                .Name("Auth")
                .Resolve(_ => new { });
        }
    }
}
