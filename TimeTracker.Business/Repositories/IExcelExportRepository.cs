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
        Task<IEnumerable<ExcelModel>> GetAsync(string like);
        Task<double> GetUserHours(Guid userId);
    }
}
