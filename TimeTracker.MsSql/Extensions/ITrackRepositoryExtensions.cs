using Dapper;
using System.Data;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Extensions
{
    public static class ITrackRepositoryExtensions
    {
        public static async Task<TrackModel> CreateAsync(this ITrackRepository trackRepository, TrackModel model, IDbConnection connection, IDbTransaction? transaction = null)
        {
            await trackRepository.StopAllAsync();
            model.CreatedAt = model.UpdatedAt = DateTime.UtcNow;
            if (model.StartTime == null)
            {
                model.StartTime = DateTime.UtcNow;
            }
            string query = @"INSERT INTO Tracks 
                              (Id, Title, UserId, Kind, StartTime, EndTime, CreatedAt, UpdatedAt)
                              VALUES (@Id, @Title, @UserId, @Kind, 
                              @StartTime, @EndTime, @CreatedAt, @UpdatedAt)";

            await connection.QuerySingleOrDefaultAsync(query, model, transaction);
            return model;
        }
    }
}
