using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Filters;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IVacationRequestRepository
    {
        Task<VacationRequestModel> GetByIdAsync(Guid id);
        Task<IEnumerable<VacationRequestModel>> GetAsync(Guid userId, DateTime from, DateTime to);
        Task<GetEntitiesResponse<VacationRequestModel>> GetAsync(int pageNumber, int pageSize, VacationRequestsFilter filter, Guid currentUserId);
        Task<VacationRequestModel> CreateAsync(VacationRequestModel model);
        Task<VacationRequestModel> UpdateAsync(VacationRequestModel model);
        Task UpdateStatusAsync(Guid id, VacationRequestStatus status);
        Task RemoveAsync(Guid id);
    }
}
