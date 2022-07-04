using GraphQL.Types;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Tracks;

namespace TimeTracker.Server.GraphQL
{
    public class Mutations : ObjectGraphType
    {
        public Mutations()
        {
            Field<AuthMutations>()
                .Name("Auth")
                .Resolve(_ => new { });
            Field<TracksMutation>()
                .Name("Tracks")
                .Resolve(_ => new { });
        }
    }
}
