using TimeTracker.Business.Managers;

namespace TimeTracker.Server.Services
{
    public class CalendarDaysService
    {
        private readonly ICalendarDayManager calendarDayManager;

        public CalendarDaysService(ICalendarDayManager calendarDayManager)
        {
            this.calendarDayManager = calendarDayManager;
        }

        public async Task<int> GetAmountWorkingHoursInMonth(DateTime dateTime)
        {

            return 0;
        }
    }
}
