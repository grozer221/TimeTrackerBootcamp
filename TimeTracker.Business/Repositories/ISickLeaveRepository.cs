using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Filters;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface ISickLeaveRepository
    {
        Task<SickLeaveModel> GetByIdAsync(Guid id);
        Task<IEnumerable<SickLeaveModel>> GetAsync(Guid userId, DateTime from, DateTime to);
        Task<GetEntitiesResponse<SickLeaveModel>> GetAsync(int pageNumber, int pageSize, SickLeaveFilter filter, Guid userId);
        Task<SickLeaveModel> CreateAsync(SickLeaveModel model);
        Task<SickLeaveModel> UpdateAsync(SickLeaveModel model);
        Task RemoveAsync(Guid id);
    }
}
