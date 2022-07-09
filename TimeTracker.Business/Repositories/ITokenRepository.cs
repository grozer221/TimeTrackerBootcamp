using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface ITokenRepository : IRepository<TokenModel>
    {
        Task<IEnumerable<TokenModel>> GetByUserId(Guid userId);
        Task<TokenModel> GetByToken(string token);
        Task RemoveAsync(Guid userId, string token);
    }
}
