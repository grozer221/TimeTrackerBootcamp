using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IAccessTokenRepository
    {
        Task<AceessTokenModel> CreateAsync(AceessTokenModel model);
        Task<IEnumerable<AceessTokenModel>> GetByUserId(Guid userId);
        Task<AceessTokenModel> GetByToken(string token);
        Task RemoveAsync(Guid userId, string token);
        Task RemoveAllForUserExceptTokenAsync(Guid userId, string token);
        Task RemoveAllForUserAsync(Guid userId);
    }
}
