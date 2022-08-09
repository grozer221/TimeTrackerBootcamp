using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;
using TimeTracker.Business.Models.Filters;

namespace TimeTracker.Business.Repositories
{
    public interface IExcelExportRepository
    {
        Task<IEnumerable<UserModel>> GetAsync(UserFilter filter, DateTime date);
        Task GetUserHours(Guid userId, DateTime date, ExcelModel model);
    }
}
