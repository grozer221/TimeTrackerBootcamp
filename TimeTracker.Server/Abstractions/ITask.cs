using Quartz;

namespace TimeTracker.Server.Abstractions
{
    public interface ITask : IJob
    {
        string JobName { get; }
        JobKey JobKey { get; }
        string TriggerName { get; }
        TriggerKey TriggerKey { get; }
        Task ResumeAsync();
        Task PauseAsync();
        Task RescheduleAsync();
        Task<ITrigger> CreateTriggerAsync();
        Task<ITriggerConfigurator> ConfigureTriggerConfiguratorAsync(ITriggerConfigurator configurator);
        Task<string> GetCronAsync();

    }
}
