using System.Data;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using Dapper;
using TimeTracker.Business.Abstractions;

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

        public async Task<GetEntitiesResponse<TrackModel>> GetAsync(string like, int take, int skip)
        {
            IEnumerable<TrackModel> tracks;
            like = "%" + like + "%";

            int total;
            string query = "SELECT * FROM Tracks WHERE Title LIKE @like ORDER BY Id OFFSET @skip ROWS FETCH NEXT @take ROWS ONLY";

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                tracks = await db.QueryAsync<TrackModel>(query, new {like, take, skip});
                total = await db.QueryFirstOrDefaultAsync<int>("SELECT COUNT(*) FROM Tracks WHERE Title LIKE @like", new { like });
            }

            return new GetEntitiesResponse<TrackModel>
            {
                Entities = tracks,
                PageSize = take,
                Total = total
            };
        }

        public async Task<TrackModel> CreateAsync(TrackModel model)
        {
            model.CreatedAt = model.UpdatedAt = DateTime.Now;
            if (model.StartTime == null)
            {
                model.StartTime = DateTime.Now;
            }
           
            using (IDbConnection db = dapperContext.CreateConnection())
            {
                string query = @"INSERT INTO Tracks 
                              (Id, Title, UserId, Kind, StartTime, CreatedAt, UpdatedAt)
                              VALUES (@Id, @Title, @UserId, @Kind, 
                              @StartTime, @CreatedAt, @UpdatedAt)";
                await db.QuerySingleOrDefaultAsync<Guid>(query, model);
            }

            return model;
        }

        public async Task<TrackModel> RemoveAsync(Guid id)
        {
            using (IDbConnection db = dapperContext.CreateConnection())
            {
                await db.QuerySingleOrDefaultAsync("DELETE FROM Tracks WHERE Id = @id", new { id });
                return new TrackModel();
            }
        }

        public async Task<TrackModel> UpdateAsync(TrackModel model)
        {
            model.UpdatedAt = DateTime.Now;
            string query = @"UPDATE Tracks 
                            SET Title = @Title, Kind = @Kind, StartTime = @StartTime, 
                            EndTime = @EndTime, UpdatedAt = @UpdatedAt WHERE Id = @Id";

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                await db.QueryAsync<TrackModel>(query, model);
            }

            return model;
        }

        public async Task<IEnumerable<TrackModel>> GetAsync()
        {
            IEnumerable<TrackModel> tracks;
            using (IDbConnection db = dapperContext.CreateConnection())
            {
                tracks = await db.QueryAsync<TrackModel>("SELECT * FROM Tracks");
            }

            return tracks;
        }
    }
}
