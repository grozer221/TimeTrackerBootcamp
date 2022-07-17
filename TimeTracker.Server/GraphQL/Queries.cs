using GraphQL.Types;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.CalendarDays;
using TimeTracker.Server.GraphQL.Modules.Settings;
using TimeTracker.Server.GraphQL.Modules.Tracks;
using TimeTracker.Server.GraphQL.Modules.Users;

namespace TimeTracker.Server.GraphQL
{
    public class Queries : ObjectGraphType
    {
        public Queries()
        {
            Field<NonNullGraphType<AuthQueries>>()
                .Name("Auth")
                .Resolve(_ => new { });

            Field<NonNullGraphType<TracksQueries>>()
                .Name("Tracks")
                .Resolve(_ => new { });
            
            Field<NonNullGraphType<UsersQueries>>()
                .Name("Users")
                .Resolve(_ => new { });
            
            Field<NonNullGraphType<CalendarDaysQueries>>()
                .Name("CalendarDays")
                .Resolve(_ => new { });
            
            Field<NonNullGraphType<SettingsQueries>>()
                .Name("Settings")
                .Resolve(_ => new { });
        }
    }
}
