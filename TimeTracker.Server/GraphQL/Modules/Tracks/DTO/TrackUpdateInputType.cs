using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackUpdateInput
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public TrackKind Kind { get; set; }
        public TrackCreation Creation { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

    }

    public class TrackUpdateInputType : InputObjectGraphType<TrackUpdateInput>
    {
        public TrackUpdateInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
               .Name("Id")
               .Resolve(context => context.Source.Id);

            Field<StringGraphType, string?>()
                 .Name("Title")
                 .Resolve(context => context.Source.Title);

            Field<NonNullGraphType<TrackKindType>, TrackKind>()
                .Name("Kind")
                .Resolve(context => context.Source.Kind);

            Field<NonNullGraphType<TrackCreationType>, TrackCreation>()
                .Name("Creation")
                .Resolve(context => context.Source.Creation);

            Field<DateTimeGraphType, DateTime?>()
                .Name("StartTime")
                .Resolve(context => context.Source.StartTime);

            Field<DateTimeGraphType, DateTime?>()
                .Name("EndTime")
                .Resolve(context => context.Source.EndTime);
        }
    }
}
