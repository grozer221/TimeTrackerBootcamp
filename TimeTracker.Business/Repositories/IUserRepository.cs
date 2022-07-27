using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;
using TimeTracker.Business.Models.Filters;

namespace TimeTracker.Business.Repositories
{
    public interface IUserRepository
    {
        Task<UserModel> GetByIdAsync(Guid id);
        Task<UserModel> GetByEmailAsync(string email);
        Task<IEnumerable<UserModel>> GetAsync();
        Task<GetEntitiesResponse<UserModel>> GetAsync(UserFilter filter, int take, int skip);
        Task<UserModel> CreateAsync(UserModel model);
        Task<UserModel> UpdateAsync(UserModel model);
        Task UpdatePasswordAsync(Guid userId, string password, string salt);
        Task<UserModel> RemoveAsync(string email);
    }
}
