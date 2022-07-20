using Quartz;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;

namespace TimeTracker.Server.Tasks
{
    public class AutoCreateDaysOffTask : IJob
    {
        public static string JobName => "AutoCreateDaysOffTask";
        public static JobKey JobKey => new JobKey(JobName);
        public static string TriggerName => JobName + "-Trigger";
        public static TriggerKey TriggerKey => new TriggerKey(TriggerName);

        private readonly ISettingsManager settingsManager;
        private readonly ICalendarDayManager calendarDayManager;

        public AutoCreateDaysOffTask(ISettingsManager settingsManager, ICalendarDayManager calendarDayManager)
        {
            this.settingsManager = settingsManager;
            this.calendarDayManager = calendarDayManager;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var settings = await settingsManager.GetAsync();
            if(settings.Tasks?.AutoCreateDaysOff != null)
            {
                var dateTimeNow = DateTime.Now;
                foreach (var day in settings.Tasks.AutoCreateDaysOff.DaysOfWeek)
                {
                    int difference = (int)day - (int)dateTimeNow.DayOfWeek;
                    var now = DateTime.Now;
                    var nowAdded = now.AddDays(difference);
                    var calendarDay = await calendarDayManager.GetByDateAsync(nowAdded);
                    if(calendarDay == null)
                    {
                        await calendarDayManager.CreateAsync(new CalendarDayModel
                        {
                            Date = nowAdded,
                            Kind = Business.Enums.DayKind.DayOff,
                        });
                    }
                }

            }
            Console.WriteLine($"[{DateTime.Now}] -- AutoCreateDaysOffTask");
        }

        public async Task<ITrigger> CreateTriggerAsync()
        {
            var cron = await GetCron();
            return TriggerBuilder.Create()
                .ForJob(JobKey)
                .WithIdentity(TriggerKey)
                .WithCronSchedule(cron)
                .Build();
        }

        public async Task<ITriggerConfigurator> ConfigureTriggerConfiguratorAsync(ITriggerConfigurator configurator)
        {
            var cron = await GetCron();
            return configurator
                .ForJob(JobKey)
                .WithIdentity(TriggerKey)
                .WithCronSchedule(cron);
        }

        private async Task<string> GetCron()
        {
            var settings = await settingsManager.GetAsync();
            var hour = settings.Tasks.AutoCreateDaysOff?.TimeWhenCreate.Hour;
            var minute = settings.Tasks.AutoCreateDaysOff?.TimeWhenCreate.Minute;
            var second = settings.Tasks.AutoCreateDaysOff?.TimeWhenCreate.Second;
            var daysOfWeek = (int)settings.Tasks.AutoCreateDaysOff?.DayOfWeekWhenCreate + 1;
            return $"{second} {minute} {hour} ? * {daysOfWeek}";
        }
    }
}
