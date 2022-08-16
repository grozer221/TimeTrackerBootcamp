using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface ICalendarDayRepository
    {
        Task<CalendarDayModel> GetByDateAsync(DateTime date);
        Task<IEnumerable<CalendarDayModel>> GetAsync();
        Task<IEnumerable<CalendarDayModel>> GetAsync(DateTime from, DateTime to);
        Task<CalendarDayModel> CreateAsync(CalendarDayModel model);
        Task<CalendarDayModel> UpdateAsync(CalendarDayModel model);
        Task<CalendarDayModel> RemoveAsync(DateTime date);
    }
}
