using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface ICompletedTaskRepository
    {
        Task<CompletedTaskModel?> GetLastExecutedAsync(string kind);
        Task<CompletedTaskModel> CreateAsync(CompletedTaskModel model);
        IEnumerable<Command> GetCommandsForCreate(CompletedTaskModel model);
    }
}
