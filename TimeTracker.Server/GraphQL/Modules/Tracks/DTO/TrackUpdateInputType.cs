using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackUpdateInput
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
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
