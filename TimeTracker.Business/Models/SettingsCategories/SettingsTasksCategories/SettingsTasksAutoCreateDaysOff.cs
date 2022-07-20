namespace TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories
{
    public class SettingsTasksAutoCreateDaysOff
    {
        public bool IsEnabled { get; set; }
        public DayOfWeek DayOfWeekWhenCreate { get; set; }
        public DateTime TimeWhenCreate { get; set; }
        public List<DayOfWeek> DaysOfWeek { get; set; }
    }
}
