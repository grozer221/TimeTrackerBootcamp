using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackInput
    {
        public string? Title { get; set; }
        public TrackKind Kind { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public TrackModel ToModel()
        {
            return new TrackModel
            {   
                Title = this.Title,
                Description = this.Description,
                StartTime = this.StartTime,
                EndTime = this.EndTime
            };
        }
    }

    public class TrackInputType : InputObjectGraphType<TrackInput>
    {
        public TrackInputType()
        {
            Field<StringGraphType, string?>()
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
