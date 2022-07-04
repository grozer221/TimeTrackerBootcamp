using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using Dapper;

namespace TimeTracker.MsSql.Repositories
{
    public class TrackRepository : ITrackRepository
    {
        private readonly DapperContext dapperContext;

        public TrackRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<TrackModel> GetByIdAsync(Guid id)
        {
            TrackModel track;
            using (IDbConnection db = dapperContext.CreateConnection())
            {
                track = await db.QueryFirstOrDefaultAsync<TrackModel>("SELECT * FROM Tracks WHERE Id = @Id", new { id });
            }

            return track;
        }

        public async Task<IEnumerable<TrackModel>> GetAsync(string like, int take, int skip)
        {
            IEnumerable<TrackModel> tracks;
            using (IDbConnection db = dapperContext.CreateConnection())
            {
                tracks = await db.QueryAsync<TrackModel>("SELECT * FROM Tracks");
            }

            return tracks;
        }

        public async Task<TrackModel> CreateAsync(TrackModel model)
        {
            model.CreatedAt = model.UpdatedAt = DateTime.Now;
            model.StartTime = DateTime.Now;

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                string query = @"INSERT INTO Tracks 
                              (Id, Title, UserId, Description, StartTime, CreatedAt, UpdatedAt)
                              VALUES (@Id, @Title, @UserId, @Description, 
                              @StartTime, @CreatedAt, @UpdatedAt)";
                await db.QuerySingleOrDefaultAsync<Guid>(query, model);
            }

            return model;
        }

        public async Task StopAsync(Guid id)
        {
            var endtime = DateTime.Now;

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                await db.QueryAsync<TrackModel>("UPDATE Tracks SET EndTime = @EndTime WHERE id = @id", new { endtime, id });
            }
        }

        
        public async Task RemoveAsync(Guid id)
        {
            using (IDbConnection db = dapperContext.CreateConnection())
            {
                await db.QuerySingleOrDefaultAsync("DELETE FROM Tracks WHERE Id = @id", new { id });
            }
        }

        public async Task<TrackModel> UpdateAsync(TrackModel model)
        {
            model.UpdatedAt = DateTime.Now;
            string query = @"UPDATE Tracks 
                            SET Title = @Title, Description = @Description, StartTime = @StartTime, 
                            EndTime = @EndTime, UpdatedAt = @UpdatedAt WHERE Id = @Id";

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                await db.QueryAsync<TrackModel>(query, model);
            }

            return model;
        }
    }
}
