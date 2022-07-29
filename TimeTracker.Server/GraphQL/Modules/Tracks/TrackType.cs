using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Tracks
{
    public class TrackType : BaseType<TrackModel>
    {
        public TrackType() : base()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
                .Name("UserId")
                .Resolve(context => context.Source.UserId);

            Field <StringGraphType, string?>()
                .Name("Title")
                .Resolve(context => context.Source.Title);

            Field<NonNullGraphType<TrackKindType>,TrackKind>()
                .Name("Kind")
                .Resolve(context => context.Source.Kind);

            Field<DateTimeGraphType, DateTime?>()
                .Name("StartTime")
                .Resolve(context => context.Source.StartTime);

            Field<DateTimeGraphType, DateTime?>()
                .Name("EndTime")
                .Resolve(context => context.Source.EndTime);

        }
    }
}
