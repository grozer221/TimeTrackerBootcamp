using Dapper;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Repositories
{
    public class CompletedTaskRepository : ICompletedTaskRepository
    {
        private readonly DapperContext dapperContext;

        public CompletedTaskRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<CompletedTaskModel?> GetLastExecutedAsync(string kind)
        {
            string query = @"select top 1 * from CompletedTasks where Kind = @Kind order by CreatedAt desc";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<CompletedTaskModel>(query, new { kind });
            }
        }

        public async Task<CompletedTaskModel> CreateAsync(CompletedTaskModel model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.UtcNow;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into CompletedTasks 
                            (Id,   DateExecute,  Kind,  CreatedAt,  UpdatedAt) values 
                            (@Id, @DateExecute, @Kind, @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }
    }
}
