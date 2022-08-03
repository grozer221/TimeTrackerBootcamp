using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;
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
                .Argument<NonNullGraphType<IntGraphType>, int>("pageSize", "Argument represent count of tracks on page")
                .Argument<NonNullGraphType<IntGraphType>, int>("pageNumber", "Argument represnt page number")
                .Argument<TrackKindType, TrackKind?>("kind", "Argument for kind filter")
                .ResolveAsync(async context =>
                {
                    string like = context.GetArgument<string>("Like");
                    int pageSize = context.GetArgument<int>("pageSize");
                    int pageNumber = context.GetArgument<int>("pageNumber");
                    TrackKind? kind = context.GetArgument<TrackKind?>("kind");
                    var currentUserId = httpContextAccessor.HttpContext.GetUserId();
                    var tracks = await trackRepository.GetAsync(like, pageSize, pageNumber, kind);
                    tracks.Entities = tracks.Entities.Where(t => t.UserId == currentUserId);
                    return tracks;
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
