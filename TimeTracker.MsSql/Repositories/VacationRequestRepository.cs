using Dapper;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Repositories
{
    public class VacationRequestRepository : IVacationRequestRepository
    {
        private readonly DapperContext dapperContext;

        public VacationRequestRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<VacationRequestModel> GetByIdAsync(Guid id)
        {
            string query = @"select * from VacationRequests where id = @id";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<VacationRequestModel>(query, new { id });
            }
        }

        public async Task<IEnumerable<VacationRequestModel>> GetAsync(Guid userId, DateTime from, DateTime to)
        {
            string query = @"select * from VacationRequests 
                            where userId = @userId and DateStart between @from and @to";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryAsync<VacationRequestModel>(query, new { userId, from, to });
            }
        }

        public async Task<GetEntitiesResponse<VacationRequestModel>> GetAsync(int pageNumber, int pageSize)
        {
            string getCountQuery = @"select count(*) from VacationRequests";

            string getEntitiesQuery = @"select * from VacationRequests
                                        ORDER BY Id
                                        OFFSET @skip ROWS FETCH NEXT @take ROWS ONLY";

            int skip = (pageNumber - 1) * pageSize;
            using (var connection = dapperContext.CreateConnection())
            {
                var reader = await connection.QueryMultipleAsync($"{getCountQuery};{getEntitiesQuery}", new { skip, take = pageSize });
                int total = reader.Read<int>().FirstOrDefault();
                var vacationRequests = reader.Read<VacationRequestModel>();
                return new GetEntitiesResponse<VacationRequestModel>
                {
                    Entities = vacationRequests,
                    Total = total,
                    PageSize = pageSize,
                };
            }
        }

        public async Task<VacationRequestModel> CreateAsync(VacationRequestModel model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.Now;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into VacationRequests 
                            (Id,   DateStart,  DateEnd,  Comment,  Status,  UserId,  CreatedAt,  UpdatedAt) values 
                            (@Id, @DateStart, @DateEnd, @Comment, @Status, @UserId, @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }

        public async Task<VacationRequestModel> UpdateAsync(VacationRequestModel model)
        {
            model.UpdatedAt = DateTime.Now;
            string query = @"update VacationRequests
                            SET DateStart = @DateStart, DateEnd = @DateEnd, Comment = @Comment, UpdatedAt = @UpdatedAt
                            WHERE Id = @Id";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
            }
            return model;
        }

        public async Task UpdateStatusAsync(Guid id, VacationRequestStatus status)
        {
            string query = @"update VacationRequests
                            SET Status = @Status, UpdatedAt = @UpdatedAt
                            WHERE Id = @Id";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id, status, updateAt = DateTime.Now });
            }
        }

        public async Task RemoveAsync(Guid id)
        {
            string query = "delete from VacationRequests where id = @id";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }
    }
}
