using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.GraphQL.Modules.Tracks
{
    public class TracksQueries : ObjectGraphType
    {
        public TracksQueries(ITrackRepository trackRepository, IHttpContextAccessor httpContextAccessor)
        {
            Field<GetEntitiesResponseType<TrackType, TrackModel>, GetEntitiesResponse<TrackModel>>()
                .Name("Get")
                .Argument<NonNullGraphType<StringGraphType>, string>("Like", "Argument for a search")
                .Argument<NonNullGraphType<IntGraphType>, int>("Take", "Argument represent count of tracks on page")
                .Argument<NonNullGraphType<IntGraphType>, int>("Skip", "Argument represnt page number")
                .ResolveAsync(async context =>
                {
                    string like = context.GetArgument<string>("Like");
                    int take = context.GetArgument<int>("Take");
                    int skip = context.GetArgument<int>("Skip");
                    return await trackRepository.GetAsync(like, take, skip);
                }).AuthorizeWith(AuthPolicies.Authenticated);

            Field<TrackType, TrackModel>()
                .Name("GetById")
                .Argument<NonNullGraphType<GuidGraphType>, Guid> ("Id", "Id of track")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    return await trackRepository.GetByIdAsync(id);
                }).AuthorizeWith(AuthPolicies.Authenticated);
        }


    }
}
