using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Tracks
{
    public class TrackType : BaseType<TrackModel>
    {
        public TrackType() : base()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
                .Name("UserId")
                .Resolve(context => context.Source.UserId);

            Field <NonNullGraphType<StringGraphType>, string>()
                .Name("Title")
                .Resolve(context => context.Source.Title);

            Field<StringGraphType, string?>()
                .Name("Description")
                .Resolve(context => context.Source.Description);

            Field<DateTimeGraphType, DateTime?>()
                .Name("StartTime")
                .Resolve(context => context.Source.StartTime);

            Field<DateTimeGraphType, DateTime?>()
                .Name("EndTime")
                .Resolve(context => context.Source.EndTime);
        }
    }
}
