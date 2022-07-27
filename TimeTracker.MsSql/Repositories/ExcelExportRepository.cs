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

        public async Task<IEnumerable<ExcelModel>> GetAsync(string like)
        {
            IEnumerable<UserModel> users;
            List<ExcelModel> models = new List<ExcelModel>();
            like = "%" + like + "%";


            string query = "SELECT * FROM Users WHERE LastName LIKE @like ORDER BY LastName";

            using IDbConnection db = dapperContext.CreateConnection();
            users = await db.QueryAsync<UserModel>(query, new { like });

            foreach (var user in users)
            {
                var model = new ExcelModel();
                model = user.ToExcelModel();
                model.WorkerHours = await this.GetUserHours(user.Id);
                models.Add(model);
            }

            return models;
        }

        public async Task<double> GetUserHours(Guid userId)
        {
            double hours = 0;
            IEnumerable<TrackModel> tracks;

            using (var connection = dapperContext.CreateConnection())
            {
                tracks = await connection.QueryAsync<TrackModel>("SELECT * FROM Tracks WHERE UserId = @UserId", new { userId });
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
