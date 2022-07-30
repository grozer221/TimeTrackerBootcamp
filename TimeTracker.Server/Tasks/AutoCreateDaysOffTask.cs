using Quartz;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Server.Abstractions;

namespace TimeTracker.Server.Tasks
{
    public class AutoCreateDaysOffTask : ITask
    {
        public string JobName => GetType().Name;
        public JobKey JobKey => new JobKey(JobName);
        public string TriggerName => JobName + "-Trigger";
        public TriggerKey TriggerKey => new TriggerKey(TriggerName);

        private readonly ISettingsManager settingsManager;
        private readonly ICalendarDayManager calendarDayManager;
        private readonly IServiceProvider serviceProvider;

        public AutoCreateDaysOffTask(ISettingsManager settingsManager, ICalendarDayManager calendarDayManager, IServiceProvider serviceProvider)
        {
            this.settingsManager = settingsManager;
            this.calendarDayManager = calendarDayManager;
            this.serviceProvider = serviceProvider;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var settings = await settingsManager.GetAsync();
            var dateTimeNow = DateTime.Now;
            var mondayDate = DateTime.Today;
            mondayDate = mondayDate
                       .AddDays(-(((mondayDate.DayOfWeek - DayOfWeek.Monday) + 7) % 7));
            var saturdayDate = mondayDate.AddDays(7);
            var numDays = (int)((saturdayDate - mondayDate).TotalDays);
            var currentWeekDates = Enumerable
                       .Range(0, numDays)
                       .Select(x => mondayDate.AddDays(x))
                       .ToList();
            var datesForCreateDayOff = currentWeekDates.Where(date => settings.Tasks.AutoCreateDaysOff.DaysOfWeek.Contains(date.DayOfWeek)).ToList();
            foreach (var dateForCreateDayOff in datesForCreateDayOff)
            {
                var calendarDay = await calendarDayManager.GetByDateAsync(dateForCreateDayOff);
                if(calendarDay == null)
                {
                    await calendarDayManager.CreateAsync(new CalendarDayModel
                    {
                        Date = dateForCreateDayOff,
                        Kind = DayKind.DayOff,
                    });
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
            if (settings.Tasks.AutoCreateDaysOff.IsEnabled)
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
            var hour = settings.Tasks.AutoCreateDaysOff.TimeWhenCreate.Hour;
            var minute = settings.Tasks.AutoCreateDaysOff.TimeWhenCreate.Minute;
            var second = settings.Tasks.AutoCreateDaysOff.TimeWhenCreate.Second;
            var daysOfWeek = (int)settings.Tasks.AutoCreateDaysOff.DayOfWeekWhenCreate + 1;
            return $"{second} {minute} {hour} ? * {daysOfWeek}";
        }
    }
}
