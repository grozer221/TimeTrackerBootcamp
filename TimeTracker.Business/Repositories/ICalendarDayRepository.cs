using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface ICalendarDayRepository : IRepository<CalendarDayModel>
    {
        Task<IEnumerable<CalendarDayModel>> GetAsync(DateTime from, DateTime to);
        Task<CalendarDayModel> GetByDateAsync(DateTime date);
        Task<CalendarDayModel> RemoveAsync(DateTime date);
    }
}
