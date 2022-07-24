using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IUsers_UsersWhichCanApproveVocationRequestsRepository
    {
        Task<IEnumerable<UserModel>> GetUsersWhichCanApproveVacationRequests(Guid forUserId);
        Task<Users_UsersWhichCanApproveVocationRequests> CreateUsersWhichCanApproveVacationRequests(Users_UsersWhichCanApproveVocationRequests users_UsersWhichCanApproveVocationRequests);
        Task RemoveUsersWhichCanApproveVacationRequests(Guid forUserId);
    }
}
