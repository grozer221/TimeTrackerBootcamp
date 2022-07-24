using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackRemoveInput
    {
        public Guid Id { get; set; }
    }

    public class TrackRemoveInputType : InputObjectGraphType<TrackRemoveInput>
    {
        public TrackRemoveInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
               .Name("Id")
               .Resolve(context => context.Source.Id);
        }
    }
}
