using GraphQL.Types;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Tracks;
using TimeTracker.Server.GraphQL.Modules.Users;

namespace TimeTracker.Server.GraphQL
{
    public class Queries : ObjectGraphType
    {
        public Queries()
        {
            Field<AuthQueries>()
                .Name("Auth")
                .Resolve(_ => new { });

            Field<TracksQueries>()
                .Name("Tracks")
                .Resolve(_ => new { });
            
            Field<UsersQueries>()
                .Name("Users")
                .Resolve(_ => new { });
        }
    }
}
