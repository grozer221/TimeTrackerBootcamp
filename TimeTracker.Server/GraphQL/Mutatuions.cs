using GraphQL.Types;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.CalendarDays;
using TimeTracker.Server.GraphQL.Modules.Tracks;
using TimeTracker.Server.GraphQL.Modules.Users;

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
            
            Field<UsersMutations>()
                .Name("Users")
                .Resolve(_ => new { });
            
            Field<CalendarDaysMutations>()
                .Name("CalendarDays")
                .Resolve(_ => new { });
        }
    }
}
