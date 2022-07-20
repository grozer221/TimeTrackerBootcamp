using Quartz;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Server.Abstractions;

namespace TimeTracker.Server.Tasks
{
    public class DemoTask : IJob
    {
        public static string JobName => "DemoTask";
        public static JobKey JobKey => new JobKey(JobName);
        public static string TriggerName => JobName + "-Trigger";
        public static TriggerKey TriggerKey => new TriggerKey(TriggerName);

        private readonly ISettingsManager settingsManager;


        public DemoTask(ISettingsManager settingsManager)
        {
            this.settingsManager = settingsManager;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var settings = await settingsManager.GetAsync();
            if(settings.Tasks?.AutoCreateDaysOff != null)
            {
                var dateTimeNow = DateTime.Now;

                foreach(var day in settings.Tasks.AutoCreateDaysOff.DaysOfWeek)
                {
                    int difference = (int)dateTimeNow.DayOfWeek - (int)day;
                }

            }
            Console.WriteLine($"GG WP {DateTime.Now}");
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
