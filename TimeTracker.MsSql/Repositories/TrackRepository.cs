using System.Data;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using Dapper;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Enums;
using TimeTracker.Business;
using TimeTracker.MsSql.Extensions;

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

        public async Task<GetEntitiesResponse<TrackModel>> GetAsync(string like, int pageSize, int pageNumber, TrackKind? kind, Guid? userId = null)
        {
            IEnumerable<TrackModel> tracks;
            like = "%" + like + "%";
            string userIdString = userId.ToString();
            string userIdReg = $"%{userIdString}%";
            string kindReg = $"%{((kind == null) ? kind : kind.GetHashCode())}%";

            int total;
            int skip = (pageNumber - 1) * pageSize;

            string query = @"SELECT * 
                             FROM Tracks 
                             WHERE Title LIKE @like and UserId LIKE @userId and Kind LIKE @kind and EndTime is not null
                             ORDER BY StartTime DESC 
                             OFFSET @skip ROWS FETCH NEXT @take ROWS ONLY";

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                tracks = await db.QueryAsync<TrackModel>(query, new { like, userId = userIdReg, kind = kindReg, skip, take = pageSize });
                total = await db.QueryFirstOrDefaultAsync<int>("SELECT COUNT(*) FROM Tracks WHERE Title LIKE @like and UserId LIKE @userId and Kind LIKE @kind", new { like, userId = userIdReg, kind = kindReg });
            }

            return new GetEntitiesResponse<TrackModel>
            {
                Entities = tracks,
                PageSize = pageSize,
                Total = total,
                TrackKind = kind
            };
        }

        public async Task<TrackModel> CreateAsync(TrackModel model)
        {
            using (IDbConnection db = dapperContext.CreateConnection())
            {
                return await this.CreateAsync(model, db);
            }
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

        public async Task StopAllAsync()
        {
            IEnumerable<TrackModel> tracks;
            string query = "SELECT * FROM Tracks WHERE EndTime is null";

            using (IDbConnection db = dapperContext.CreateConnection())
            {
                tracks = await db.QueryAsync<TrackModel>(query);
            }
            foreach (var track in tracks)
            {
                track.EndTime = DateTime.UtcNow;
                await UpdateAsync(track);
            }
        }

        public async Task<TrackModel> GetCurrentAsync(Guid userId)
        {
            TrackModel track;
            string userIdString = userId.ToString();
            using (IDbConnection db = dapperContext.CreateConnection())
            {
                track = await db.QueryFirstOrDefaultAsync<TrackModel>("SELECT * FROM Tracks WHERE EndTime is null and UserId = @userId", new { userId = userIdString });
            }
            return track;
        }
    }
}
