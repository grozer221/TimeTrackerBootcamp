using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Http;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Tracks.DTO;

namespace TimeTracker.Server.GraphQL.Modules.Tracks
{
    public class TracksMutation : ObjectGraphType
    {
        public TracksMutation(ITrackRepository trackRepository, IHttpContextAccessor httpContextAccessor)
        {

            Field<NonNullGraphType<TrackType>, TrackModel>()
                .Name("Create")
                .Argument<NonNullGraphType<TrackInputType>, TrackInput>("TrackInput", "Argument for create track")
                .ResolveAsync(async context =>
                {
                    var model = context.GetArgument<TrackInput>("TrackInput");
                    var track = new TrackModel()
                    {
                        Id = Guid.NewGuid(),
                        UserId = httpContextAccessor.HttpContext.GetUserId(),
                        Title = model.Title,
                        Description = model.Description
                    };
                    
                    return await trackRepository.CreateAsync(track);
                }).AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<TrackType>, TrackModel>()
                .Name("Stop")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Id of track")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    var userId = httpContextAccessor.HttpContext.GetUserId();
                    var track = await trackRepository.GetByIdAsync(id);

                    if(track.UserId != userId)
                    {
                        throw new Exception("You don`t have permission");
                    }

                    return await trackRepository.StopAsync(id);
                    
                }).AuthorizeWith(AuthPolicies.Authenticated);

            Field<StringGraphType>()
                .Name("Delete")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Id of track")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    var userId = httpContextAccessor.HttpContext.GetUserId();
                    var track = await trackRepository.GetByIdAsync(id);
                    
                    if (track.UserId != userId)
                    {
                        throw new Exception("You don`t have permission");
                    }
                    
                    await trackRepository.RemoveAsync(id);

                    return "Deleted";
                }).AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<TrackType>, TrackModel>()
                .Name("Update")
                .Argument<NonNullGraphType<TrackUpdateInputType>, TrackUpdateInput>("TrackInput", "Argument for update track")
                .ResolveAsync(async context =>
                {
                    var model = context.GetArgument<TrackUpdateInput>("TrackInput");
                    var userId = httpContextAccessor.HttpContext.GetUserId();
                    var track = new TrackModel()
                    {
                        Id = model.Id,
                        Title = model.Title,
                        Description = model.Description,
                        StartTime = model.StartTime,
                        EndTime = model.EndTime
                        
                    };

                    if (track.UserId != userId)
                    {
                        throw new Exception("You don`t have permission");
                    }

                    return await trackRepository.UpdateAsync(track);
                }).AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
