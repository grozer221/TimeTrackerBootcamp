using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackOtherInput
    {
        public Guid UserId { get; set; }
        public string? Title { get; set; }
        public TrackKind Kind { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public TrackModel ToModel()
        {
            return new TrackModel
            {
                UserId = this.UserId,
                Title = this.Title,
                Description = this.Description,
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

            Field<StringGraphType, string?>()
                 .Name("Description")
                 .Resolve(context => context.Source.Description);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime ?>()
                .Name("StartTime")
                .Resolve(context => context.Source.StartTime);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime?>()
                .Name("EndTime")
                .Resolve(context => context.Source.EndTime);
        }
    }
}
