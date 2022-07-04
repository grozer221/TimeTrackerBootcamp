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
                .Argument<NonNullGraphType<StringGraphType>, string>("Like", "Argument for a search")
                .Argument<NonNullGraphType<IntGraphType>, int>("Take", "Argument represent count of tracks on page")
                .Argument<NonNullGraphType<IntGraphType>, int>("Skip", "Argument represnt page number")
                .ResolveAsync(async context =>
                {
                    string like = context.GetArgument<string>("Like");
                    int take = context.GetArgument<int>("Take");
                    int skip = context.GetArgument<int>("Skip");
                    return await repository.GetAsync(like, take, skip);
                });

            Field<TrackType, TrackModel>()
                .Name("GetTrackById")
                .Argument<NonNullGraphType<GuidGraphType>, Guid> ("Id", "Id of track")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    return await repository.GetByIdAsync(id);
                });
        }


    }
}
