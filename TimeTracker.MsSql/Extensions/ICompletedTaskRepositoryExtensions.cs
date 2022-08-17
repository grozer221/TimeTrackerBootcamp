using Dapper;
using System.Data;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Extensions
{
    public static class ICompletedTaskRepositoryExtensions
    {
        public static async Task<CompletedTaskModel> CreateAsync(this ICompletedTaskRepository completedTaskRepository, CompletedTaskModel model, IDbConnection connection, IDbTransaction transaction = null)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.UtcNow;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = @"insert into CompletedTasks 
                                (Id,   DateExecute,  Name,  CreatedAt,  UpdatedAt) values 
                                (@Id, @DateExecute, @Name, @CreatedAt, @UpdatedAt)";
            await connection.ExecuteAsync(query, model, transaction);
            return model;
        }
    }
}
