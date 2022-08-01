using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IUsers_UsersWhichCanApproveVacationRequestsRepository
    {
        Task<IEnumerable<UserModel>> GetUsersWhichCanApproveVacationRequests(Guid forUserId);
        Task<Users_UsersWhichCanApproveVacationRequests> CreateUsersWhichCanApproveVacationRequests(Users_UsersWhichCanApproveVacationRequests users_UsersWhichCanApproveVacationRequests);
        Task RemoveUsersWhichCanApproveVacationRequests(Guid forUserId);
    }
}
