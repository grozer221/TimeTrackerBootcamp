using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface ITrackRepository 
    {
        Task<TrackModel> GetByIdAsync(Guid id);
        Task<IEnumerable<TrackModel>> GetAsync();
        Task<GetEntitiesResponse<TrackModel>> GetAsync(string like, int pageSize, int pageNumber, TrackKind? kind, Guid? userId = null);
        Task<TrackModel> GetCurrentAsync();
        Task<TrackModel> CreateAsync(TrackModel model);
        Task<TrackModel> UpdateAsync(TrackModel model);
        Task<TrackModel> RemoveAsync(Guid id);
    }
}
