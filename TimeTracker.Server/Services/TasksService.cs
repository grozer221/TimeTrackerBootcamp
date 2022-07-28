using Quartz;
using TimeTracker.Business.Managers;
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
            var settingsManager = scope.ServiceProvider.GetRequiredService<ISettingsManager>();
            var settings = await settingsManager.GetAsync();

            var scheduler = await schedulerFactory.GetScheduler();
            if (!settings.Tasks.AutoCreateDaysOff.IsEnabled)
            {
                var autoCreateDaysOffTask = scope.ServiceProvider.GetRequiredService<AutoCreateDaysOffTask>();
                await scheduler.PauseJob(autoCreateDaysOffTask.JobKey);
            }
            if (!settings.Tasks.AutoCreateTracks.IsEnabled)
            {
                var autoCreateTracks = scope.ServiceProvider.GetRequiredService<AutoCreateTracks>();
                await scheduler.PauseJob(autoCreateTracks.JobKey);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
