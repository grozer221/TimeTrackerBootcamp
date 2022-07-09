using TimeTracker.Business.Abstractions;

namespace TimeTracker.Server.GraphQL.Abstractions
{
    public interface IModelable<T> where T : BaseModel
    {
        T ToModel();
    }
}
