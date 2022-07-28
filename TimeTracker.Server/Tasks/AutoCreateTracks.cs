using Quartz;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
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
        private readonly IUserRepository userRepository;
        private readonly ITrackRepository trackRepository;

        public AutoCreateTracks(ISettingsManager settingsManager, IServiceProvider serviceProvider, IUserRepository userRepository, ITrackRepository trackRepository)
        {
            this.settingsManager = settingsManager;
            this.serviceProvider = serviceProvider;
            this.userRepository = userRepository;
            this.trackRepository = trackRepository;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var settings = await settingsManager.GetAsync();
            var hoursInWorkday = settings.Employment.HoursInWorkday;
            var workdayStartAt = settings.Employment.WorkdayStartAt;
            var now = DateTime.Now;
            var workdayStartAtDateTime = new DateTime(now.Year, now.Month, now.Day, workdayStartAt.Hour, workdayStartAt.Minute, workdayStartAt.Second);
            var workdayEndAtDateTime = workdayStartAtDateTime.AddHours(hoursInWorkday);
            var users = await userRepository.GetAsync();
            foreach (var user in users)
            {
                if(user.Employment == Employment.FullTime)
                {
                    var track = new TrackModel
                    {
                        Id = Guid.NewGuid(),
                        Title = "Auto created",
                        StartTime = workdayStartAtDateTime,
                        UserId = user.Id,
                    };
                    await trackRepository.CreateAsync(track);
                    track.EndTime = workdayEndAtDateTime;
                    await trackRepository.UpdateAsync(track);
                }
            }
            Console.WriteLine($"[{DateTime.Now}] -- {JobName}");
        }

        public async Task ResumeAsync()
        {
            using var scope = serviceProvider.CreateScope();
            var schedulerFactory = scope.ServiceProvider.GetRequiredService<ISchedulerFactory>();
            var scheduler = await schedulerFactory.GetScheduler();
            await scheduler.ResumeJob(JobKey);
        }

        public async Task PauseAsync()
        {
            using var scope = serviceProvider.CreateScope();
            var schedulerFactory = scope.ServiceProvider.GetRequiredService<ISchedulerFactory>();
            var scheduler = await schedulerFactory.GetScheduler();
            await scheduler.PauseJob(JobKey);
        }

        public async Task RescheduleAsync()
        {
            using var scope = serviceProvider.CreateScope();
            var schedulerFactory = scope.ServiceProvider.GetRequiredService<ISchedulerFactory>();
            var scheduler = await schedulerFactory.GetScheduler();
            await scheduler.RescheduleJob(TriggerKey, await CreateTriggerAsync());

            var settings = await settingsManager.GetAsync();
            if (settings.Tasks.AutoCreateTracks.IsEnabled)
                await ResumeAsync();
            else
                await PauseAsync();
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
