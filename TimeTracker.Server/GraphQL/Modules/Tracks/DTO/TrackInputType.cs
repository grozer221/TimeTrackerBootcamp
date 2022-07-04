using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Modules.Abstractions;


namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackInputType : InputObjectGraphType<TrackInput>
    {
        public TrackInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("Title")
                 .Resolve(context => context.Source.Title);

            Field<StringGraphType, string?>()
                 .Name("Description")
                 .Resolve(context => context.Source.Description);
        }
    }
}
