using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackOtherInput
    {
        public Guid UserId { get; set; }
        public string? Title { get; set; }
        public TrackKind Kind { get; set; }
        public TrackCreation Creation { get; set; }
        public string? EditedBy { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public TrackModel ToModel()
        {
            return new TrackModel
            {
                UserId = this.UserId,
                Title = this.Title,
                Kind = this.Kind,
                Creation = this.Creation,
                EditedBy = this.EditedBy,
                StartTime = this.StartTime,
                EndTime = this.EndTime
            };
        }
    }

    public class TrackOtherInputType : InputObjectGraphType<TrackOtherInput>
    {
        public TrackOtherInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
               .Name("UserId")
               .Resolve(context => context.Source.UserId);

            Field<StringGraphType, string?>()
                 .Name("Title")
                 .Resolve(context => context.Source.Title);

            Field<NonNullGraphType<TrackKindType>, TrackKind>()
                .Name("Kind")
                .Resolve(context => context.Source.Kind);

            Field<NonNullGraphType<TrackCreationType>, TrackCreation>()
                .Name("Creation")
                .Resolve(context => context.Source.Creation);

            Field<StringGraphType, string?>()
                .Name("EditedBy")
                .Resolve(context => context.Source.EditedBy);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime ?>()
                .Name("StartTime")
                .Resolve(context => context.Source.StartTime);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime?>()
                .Name("EndTime")
                .Resolve(context => context.Source.EndTime);
        }
    }
}
