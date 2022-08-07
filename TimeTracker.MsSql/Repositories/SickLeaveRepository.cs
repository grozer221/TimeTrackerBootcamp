using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Repositories
{
    public class SickLeaveRepository : ISickLeaveRepository
    {
        private readonly DapperContext dapperContext;
        public SickLeaveRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<SickLeaveModel> CreateAsync(SickLeaveModel model)
        {
            model.StartDate = DateTime.Now;

            using var db = dapperContext.CreateConnection();

            return await db.QuerySingle(@"INSERT INTO SickLeave 
                            (Id, DateStart, DateEnd, Comment, UserId, CreatedAt, UpdatedAt) VALUES 
                            (@Id, @DateStart, @DateEnd, @Comment, @UserId, @CreatedAt, @UpdatedAt)", model);
        }

        public async Task<IEnumerable<SickLeaveModel>> GetAsync(Guid userId, DateTime from, DateTime to)
        {
            string query = @"SELECT * FROM SickLeave 
                            WHERE userId = @userId AND DateStart BETWEEN @from AND @to";

            using var db = dapperContext.CreateConnection();

            return await db.QueryAsync<SickLeaveModel>(query, new { userId, from, to });
        }

        public async Task<GetEntitiesResponse<SickLeaveModel>> GetAsync(int pageNumber, int pageSize)
        {
            IEnumerable<SickLeaveModel> models;
            int skip = (pageNumber - 1) * pageSize;
            string query = "SELECT * FROM SickLeave ORDER BY StartTime DESC OFFSET @skip ROWS FETCH NEXT @pageSize ROWS ONLY";

            using var db = dapperContext.CreateConnection();

            models = await db.QueryAsync<SickLeaveModel>(query, new { skip, pageSize});
            var total = await db.QueryFirstOrDefaultAsync<int>("SELECT COUNT(*) FROM SickLeave");

            return new GetEntitiesResponse<SickLeaveModel>
            {
                Entities = models,
                PageSize = pageSize,
                Total = total
            };
        }

        public async Task<SickLeaveModel> GetByIdAsync(Guid id)
        {
            using var db = dapperContext.CreateConnection();
            var model = await db.QueryFirstOrDefaultAsync<SickLeaveModel>("SELECT * FROM SickLeave WHERE Id = @Id", new { id });

            return model;
        }

        public async Task RemoveAsync(Guid id)
        {
            using var db = dapperContext.CreateConnection();
            var model = await db.QueryFirstOrDefaultAsync<SickLeaveModel>("DELETE FROM SickLeave WHERE Id = @Id", new { id });
        }

        public async Task<SickLeaveModel> UpdateAsync(SickLeaveModel model)
        {
            model.UpdatedAt = DateTime.Now;
            string query = @"UPDATE SickLeave SET StartDate = @StartDate, EndDate = @EndDate, 
                             Comment = @Comment, UpdatedAt = @UpdatedAt WHERE Id = @Id";

            using var db = dapperContext.CreateConnection();
            await db.QueryAsync<TrackModel>(query, model);

            return model;
        }
    }
}
