using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.GraphQL.Modules.Tracks
{
    public class TracksQueries : ObjectGraphType
    {
        private readonly ITrackRepository repository;

        public TracksQueries(ITrackRepository repository)
        {
            this.repository = repository;

            Field<ListGraphType<TrackType>, IEnumerable<TrackModel>>()
                .Name("GetTracks")
                .ResolveAsync(context =>
                {
                    return repository.GetAsync("", 1, 1);
                });
            Field<TrackType, TrackModel>()
                .Name("GetTrackById")
                .Argument<NonNullGraphType<GuidGraphType>, Guid> ("Id", "Id of track")
                .ResolveAsync(context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    return repository.GetByIdAsync(id);
                });
        }


    }
}
