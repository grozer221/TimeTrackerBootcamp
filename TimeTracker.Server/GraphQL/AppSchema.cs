using GraphQL.Types;

namespace TimeTracker.Server.GraphQL
{
    public class AppSchema : Schema
    {
        public AppSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<Queries>();
            Mutation = provider.GetRequiredService<Mutations>();
        }
    }
}
