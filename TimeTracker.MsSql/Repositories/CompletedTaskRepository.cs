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

        public async Task<CompletedTaskModel?> GetLastExecutedAsync(string name)
        {
            string query = @"select top 1 * from CompletedTasks where Name = @Name order by CreatedAt desc";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<CompletedTaskModel>(query, new { name });
            }
        }

        public async Task<CompletedTaskModel> CreateAsync(CompletedTaskModel model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.UtcNow;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into CompletedTasks 
                            (Id,   DateExecute,  Name,  CreatedAt,  UpdatedAt) values 
                            (@Id, @DateExecute, @Name, @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }
    }
}
