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
            like = "%" + like + "%";

            string query = "SELECT * FROM Tracks WHERE Title LIKE @like ORDER BY Id OFFSET @skip ROWS FETCH NEXT @take ROWS ONLY";

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                tracks = await db.QueryAsync<TrackModel>(query, new {like, take, skip});
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

        public async Task<TrackModel> StopAsync(Guid id)
        {
            var endtime = DateTime.Now;

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                await db.QueryAsync<TrackModel>("UPDATE Tracks SET EndTime = @EndTime WHERE id = @id", new { endtime, id });
                return await this.GetByIdAsync(id);
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

        public Task<IEnumerable<TrackModel>> GetAsync()
        {
            throw new NotImplementedException();
        }
    }
}
