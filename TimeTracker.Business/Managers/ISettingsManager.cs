using TimeTracker.Business.Abstraction;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Business.Managers
{
    public interface ISettingsManager : ISettingsRepository, IManager
    {
    }
}
