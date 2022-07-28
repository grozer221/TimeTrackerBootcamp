using Quartz;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Server.Abstractions;

namespace TimeTracker.Server.Tasks
{
    public class AutoCreateTracks : ITask
    {
        public string JobName => GetType().Name;
        public JobKey JobKey => new JobKey(JobName);
        public string TriggerName => JobName + "-Trigger";
        public TriggerKey TriggerKey => new TriggerKey(TriggerName);

        private readonly ISettingsManager settingsManager;
        private readonly IServiceProvider serviceProvider;

        public AutoCreateTracks(ISettingsManager settingsManager, IServiceProvider serviceProvider)
        {
            this.settingsManager = settingsManager;
            this.serviceProvider = serviceProvider;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var settings = await settingsManager.GetAsync();
            Console.WriteLine($"[{DateTime.Now}] -- {JobName}");
        }

        public async Task RescheduleAsync()
        {
            using var scope = serviceProvider.CreateScope();
            var schedulerFactory = scope.ServiceProvider.GetRequiredService<ISchedulerFactory>();
            var scheduler = await schedulerFactory.GetScheduler();
            await scheduler.RescheduleJob(TriggerKey, await CreateTriggerAsync());

            var settings = await settingsManager.GetAsync();
            if (settings.Tasks.AutoCreateTracks.IsEnabled)
                await scheduler.ResumeJob(JobKey);
            else
                await scheduler.PauseJob(JobKey);
        }

        public async Task<ITrigger> CreateTriggerAsync()
        {
            var cron = await GetCronAsync();
            return TriggerBuilder.Create()
                .ForJob(JobKey)
                .WithIdentity(TriggerKey)
                .WithCronSchedule(cron)
                .Build();
        }

        public async Task<ITriggerConfigurator> ConfigureTriggerConfiguratorAsync(ITriggerConfigurator configurator)
        {
            var cron = await GetCronAsync();
            return configurator
                .ForJob(JobKey)
                .WithIdentity(TriggerKey)
                .WithCronSchedule(cron);
        }

        public async Task<string> GetCronAsync()
        {
            SettingsModel settings;
            try
            {
                settings = await settingsManager.GetAsync();
            }
            catch
            {
                settings = new SettingsModel();
            }
            var hour = settings.Tasks.AutoCreateTracks.TimeWhenCreate.Hour;
            var minute = settings.Tasks.AutoCreateTracks.TimeWhenCreate.Minute;
            var second = settings.Tasks.AutoCreateTracks.TimeWhenCreate.Second;
            return $"{second} {minute} {hour} ? * *";
        }
    }
}
