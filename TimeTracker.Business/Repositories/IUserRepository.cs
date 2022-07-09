using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IUserRepository : IRepository<UserModel>
    {
        Task UpdatePasswordAsync(Guid id, string password);
        Task<UserModel> GetByEmailAsync(string email);
    }
}
