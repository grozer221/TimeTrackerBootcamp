using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IResetPassTokenRepository
    {
        Task<ResetPassTokenModel> GetByTokenAsync(string token);
        Task<ResetPassTokenModel> CreateAsync(ResetPassTokenModel model);
        Task RemoveAsync(Guid userId, string token);
        Task RemoveAllForUserAsync(Guid userId);
    }
}
