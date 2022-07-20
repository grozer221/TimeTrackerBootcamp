using Quartz;

namespace TimeTracker.Server.Abstractions
{
    public interface ITask : IJob
    {
        string JobName { get; }
        JobKey JobKey { get; }
        string TriggerName { get; }
        TriggerKey TriggerKey { get; }

        Task UpdateTriggerAsync();
        ITriggerConfigurator ConfigureTriggerConfigurator(ITriggerConfigurator configurator);
    }
}
