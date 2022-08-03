using Quartz;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Abstractions;
using TimeTracker.Server.Tasks;

namespace TimeTracker.Server.Services
{
    public class TasksService : IHostedService
    {
        private readonly ISchedulerFactory schedulerFactory;
        private readonly IServiceProvider serviceProvider;

        public TasksService(ISchedulerFactory schedulerFactory, IServiceProvider serviceProvider)
        {
            this.schedulerFactory = schedulerFactory;
            this.serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();
            var tasks = scope.ServiceProvider.GetRequiredService<IEnumerable<ITask>>();
            var completedTaskRepository = scope.ServiceProvider.GetRequiredService<ICompletedTaskRepository>();
            var autoCreateDaysOffTask = scope.ServiceProvider.GetRequiredService<AutoCreateDaysOffTask>();
            var autoCreateTracks = scope.ServiceProvider.GetRequiredService<AutoCreateTracksTask>();
            var settingsManager = scope.ServiceProvider.GetRequiredService<ISettingsManager>();
            var settings = await settingsManager.GetAsync();

            var scheduler = await schedulerFactory.GetScheduler();
            if (!settings.Tasks.AutoCreateDaysOff.IsEnabled)
            {
                await autoCreateDaysOffTask.PauseAsync();
            }
            if (!settings.Tasks.AutoCreateTracks.IsEnabled)
            {
                await autoCreateTracks.PauseAsync();
            }

            var dateTimeOffsetNow = DateTimeOffset.UtcNow;
            foreach(var task in tasks)
            {
                string cron = await task.GetCronAsync();
                var cronExpression = new CronExpression(cron);
                cronExpression.TimeZone = TimeZoneInfo.Utc;
                var lastCompletedTask = await completedTaskRepository.GetLastExecutedAsync(task.JobName);
                if (lastCompletedTask == null)
                {
                    await completedTaskRepository.CreateAsync(new CompletedTaskModel
                    {
                        DateExecute = dateTimeOffsetNow.DateTime,
                        Kind = task.JobName,
                    });
                    continue;
                }

                var lastDateExecute = DateTime.SpecifyKind(lastCompletedTask.DateExecute, DateTimeKind.Utc);
                DateTimeOffset currentDateExecute = cronExpression.GetTimeAfter(lastDateExecute).Value;
                while (DateTimeOffset.Compare(currentDateExecute, dateTimeOffsetNow) < 1)
                {
                    await task.ExecuteAsync(null, currentDateExecute.DateTime);
                    currentDateExecute = cronExpression.GetTimeAfter(currentDateExecute).Value;
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
