using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IUserRepository : IRepository<UserModel>
    {
        Task<UserModel> GetByEmailAsync(string email);
    }
}
