using TimeTracker.Business.Abstraction;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Business.Managers
{
    public interface ICalendarDayManager : ICalendarDayRepository, IManager
    {
    }
}
