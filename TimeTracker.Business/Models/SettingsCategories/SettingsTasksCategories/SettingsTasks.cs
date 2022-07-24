namespace TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories
{
    public class SettingsTasks
    {
        public SettingsTasksAutoSetWorkingHoursForFullTimers AutoSetWorkingHoursForFullTimers { get; set; } = new SettingsTasksAutoSetWorkingHoursForFullTimers();
        public SettingsTasksAutoCreateDaysOff AutoCreateDaysOff { get; set; } = new SettingsTasksAutoCreateDaysOff();
    }
}
