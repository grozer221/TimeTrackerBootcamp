using TimeTracker.Business.Abstractions;

namespace TimeTracker.Server.GraphQL.Abstractions
{
    public interface IModelable<T> where T : class
    {
        T ToModel();
    }
}
