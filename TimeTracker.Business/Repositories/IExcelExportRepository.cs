using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IExcelExportRepository
    {
        Task<IEnumerable<UserModel>> GetAsync(string like, DateTime date);
        Task<double> GetUserHours(Guid userId, DateTime date);
    }
}
