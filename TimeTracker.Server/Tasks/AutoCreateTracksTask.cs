using Quartz;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Abstractions;

namespace TimeTracker.Server.Tasks
{
    public class AutoCreateTracksTask : ITask
    {
        public string JobName => GetType().Name;
        public JobKey JobKey => new JobKey(JobName);
        public string TriggerName => JobName + "-Trigger";
        public TriggerKey TriggerKey => new TriggerKey(TriggerName);

        private readonly ISettingsManager settingsManager;
        private readonly IServiceProvider serviceProvider;
        private readonly IUserRepository userRepository;
        private readonly ITrackRepository trackRepository;
        private readonly ICompletedTaskRepository completedTaskRepository;
        private readonly IVacationRequestRepository vacationRequestRepository;
        private readonly ISickLeaveRepository sickLeaveRepository;

        public AutoCreateTracksTask(
            ISettingsManager settingsManager, 
            IServiceProvider serviceProvider, 
            IUserRepository userRepository, 
            ITrackRepository trackRepository, 
            ICompletedTaskRepository completedTaskRepository, 
            IVacationRequestRepository vacationRequestRepository,
            ISickLeaveRepository sickLeaveRepository
            )
        {
            this.settingsManager = settingsManager;
            this.serviceProvider = serviceProvider;
            this.userRepository = userRepository;
            this.trackRepository = trackRepository;
            this.completedTaskRepository = completedTaskRepository;
            this.vacationRequestRepository = vacationRequestRepository;
            this.sickLeaveRepository = sickLeaveRepository;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var nowUtc = DateTime.UtcNow;
            await ExecuteAsync(context, nowUtc);
        }

        public async Task ExecuteAsync(IJobExecutionContext? context, DateTime dateTimeNow)
        {
            var settings = await settingsManager.GetAsync();
            var hoursInWorkday = settings.Employment.HoursInWorkday;
            var workdayStartAt = settings.Employment.WorkdayStartAt;
            var workdayStartAtDateTime = new DateTime(dateTimeNow.Year, dateTimeNow.Month, dateTimeNow.Day, workdayStartAt.Hour, workdayStartAt.Minute, workdayStartAt.Second);
            var workdayEndAtDateTime = workdayStartAtDateTime.AddHours(hoursInWorkday);
            var users = await userRepository.GetAsync();
            foreach (var user in users)
            {
                var trackKinds = new List<TrackKind>();
                var todayVacationRequest = await vacationRequestRepository.GetByDateAsync(dateTimeNow, user.Id);
                if (todayVacationRequest != null)
                {
                    trackKinds.Add(TrackKind.Vacation);
                }

                var todaySickLeave = await sickLeaveRepository.GetByDateAsync(dateTimeNow, user.Id);
                if (todaySickLeave != null)
                {
                    trackKinds.Add(TrackKind.Sick);
                }

                if (trackKinds.Count == 0 && user.Employment == Employment.FullTime)
                {
                    trackKinds.Add(TrackKind.Default);
                }
                foreach (var trackKind in trackKinds)
                {
                    var track = new TrackModel
                    {
                        Id = Guid.NewGuid(),
                        Title = "Auto created",
                        StartTime = workdayStartAtDateTime,
                        Kind = trackKind,
                        UserId = user.Id,
                    };
                    await trackRepository.CreateAsync(track);
                    track.EndTime = workdayEndAtDateTime;
                    await trackRepository.UpdateAsync(track);
                }
            }
            await completedTaskRepository.CreateAsync(new CompletedTaskModel
            {
                DateExecute = dateTimeNow,
                Name = JobName,
            });
            Console.WriteLine($"[{DateTime.UtcNow}] -- {JobName} for {dateTimeNow}");
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
                .WithCronSchedule(cron, builder => builder.InTimeZone(TimeZoneInfo.Utc))
                .Build();
        }

        public async Task<ITriggerConfigurator> ConfigureTriggerConfiguratorAsync(ITriggerConfigurator configurator)
        {
            var cron = await GetCronAsync();
            return configurator
                .ForJob(JobKey)
                .WithIdentity(TriggerKey)
                .WithCronSchedule(cron, builder => builder.InTimeZone(TimeZoneInfo.Utc));
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
