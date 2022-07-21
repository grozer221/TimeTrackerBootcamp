using GraphQL.Types;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Cache;
using TimeTracker.Server.GraphQL.Modules.CalendarDays;
using TimeTracker.Server.GraphQL.Modules.FileManager;
using TimeTracker.Server.GraphQL.Modules.Settings;
using TimeTracker.Server.GraphQL.Modules.Tracks;
using TimeTracker.Server.GraphQL.Modules.Users;

namespace TimeTracker.Server.GraphQL
{
    public class Mutations : ObjectGraphType
    {
        public Mutations()
        {
            Field<NonNullGraphType<AuthMutations>>()
                .Name("Auth")
                .Resolve(_ => new { });

            Field<NonNullGraphType<TracksMutation>>()
                .Name("Tracks")
                .Resolve(_ => new { });
            
            Field<NonNullGraphType<UsersMutations>>()
                .Name("Users")
                .Resolve(_ => new { });
            
            Field<NonNullGraphType<CalendarDaysMutations>>()
                .Name("CalendarDays")
                .Resolve(_ => new { });
            
            Field<NonNullGraphType<SettingsMutations>>()
                .Name("Settings")
                .Resolve(_ => new { });
            
            Field<NonNullGraphType<CacheMutations>>()
                .Name("Cache")
                .Resolve(_ => new { });
            
            Field<NonNullGraphType<FileManagerMutations>>()
                .Name("FileManager")
                .Resolve(_ => new { });
        }
    }
}
