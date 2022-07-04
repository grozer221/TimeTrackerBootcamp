using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.GraphQL.Modules.Tracks.DTO;

namespace TimeTracker.Server.GraphQL.Modules.Tracks
{
    public class TracksMutation : ObjectGraphType
    {
        private readonly ITrackRepository repository;

        public TracksMutation(ITrackRepository repository)
        {
            this.repository = repository;

            Field<NonNullGraphType<TrackType>, TrackModel>()
                .Name("Create")
                .Argument<NonNullGraphType<TrackInputType>, TrackInput>("TrackInput", "Argument for create track")
                .ResolveAsync(async context =>
                {
                    var model = context.GetArgument<TrackInput>("TrackInput");
                    var track = new TrackModel()
                    {
                        Id = Guid.NewGuid(),
                        UserId = Guid.NewGuid(),
                        Title = model.Title,
                        Description = model.Description
                    };
                    
                    return await repository.CreateAsync(track);
                });

            Field<NonNullGraphType<TrackType>, TrackModel>()
                .Name("Stop")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Id of track")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");

                    return await repository.StopAsync(id);
                    
                });

            Field<StringGraphType>()
                .Name("Delete")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("Id", "Id of track")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    await repository.RemoveAsync(id);

                    return "Deleted";
                });

            Field<NonNullGraphType<TrackType>, TrackModel>()
                .Name("Update")
                .Argument<NonNullGraphType<TrackUpdateInputType>, TrackUpdateInput>("TrackInput", "Argument for update track")
                .ResolveAsync(async context =>
                {
                    var model = context.GetArgument<TrackUpdateInput>("TrackInput");
                    var track = new TrackModel()
                    {
                        Id = model.Id,
                        Title = model.Title,
                        Description = model.Description,
                        StartTime = model.StartTime,
                        EndTime = model.EndTime
                        
                    };

                    return await repository.UpdateAsync(track);
                });
        }
    }
}
