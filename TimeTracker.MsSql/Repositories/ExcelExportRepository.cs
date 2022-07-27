using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Repositories
{
    public class ExcelExportRepository : IExcelExportRepository
    {
        private readonly DapperContext dapperContext;

        public ExcelExportRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<IEnumerable<UserModel>> GetAsync(string like, DateTime date)
        {
            IEnumerable<UserModel> users;
            like = "%" + like + "%";

            string query = "SELECT * FROM Users WHERE LastName LIKE @like ORDER BY LastName";

            using IDbConnection db = dapperContext.CreateConnection();
            users = await db.QueryAsync<UserModel>(query, new { like });

            return users;
        }

        public async Task<double> GetUserHours(Guid userId, DateTime date)
        {
            double hours = 0;
            IEnumerable<TrackModel> tracks;
            var month = date.Month;
            var year = date.Year;

            using (var connection = dapperContext.CreateConnection())
            {
                tracks = await connection.QueryAsync<TrackModel>("SELECT * FROM Tracks WHERE UserId = @UserId AND MONTH(StartTime) = @month AND YEAR(StartTime) = @year", new { userId, month, year });
            }

            foreach (var track in tracks)
            {
                if (track.EndTime != null)
                {
                    var time = track.EndTime - track.StartTime;
                    hours += time!.Value.TotalHours;
                }
            }

            return hours;
        }
    }
}
