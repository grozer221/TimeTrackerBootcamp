using Dapper;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Repositories
{
    public class CalendarDayRepository : ICalendarDayRepository
    {
        private readonly DapperContext dapperContext;

        public CalendarDayRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<CalendarDayModel> GetByIdAsync(Guid id)
        {
            string query = @"select * from CalendarDays where id = @id";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<CalendarDayModel>(query, new { id });
            }
        }

        public async Task<CalendarDayModel> GetByDateAsync(DateTime date)
        {
            string query = @"select * from CalendarDays where Date = @date";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<CalendarDayModel>(query, new { date });
            }
        }

        public async Task<IEnumerable<CalendarDayModel>> GetAsync(DateTime from, DateTime to)
        {
            string query = @"select * from CalendarDays
                            where Date between @from and @to";
            string fromString = from.ToString("MM/dd/yyyy");
            string toString = to.ToString("MM/dd/yyyy");
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryAsync<CalendarDayModel>(query, new { from = fromString, to = toString });
            }
        }

        public async Task<IEnumerable<CalendarDayModel>> GetAsync()
        {
            string query = $"select * from CalendarDays";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryAsync<CalendarDayModel>(query);
            }
        }

        public Task<GetEntitiesResponse<CalendarDayModel>> GetAsync(string like, int take, int skip)
        {
            throw new NotImplementedException();
        }

        public async Task<CalendarDayModel> CreateAsync(CalendarDayModel model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.Now;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into CalendarDays 
                            ( Id,  Date,  Kind,  PercentageWorkHours,  CreatedAt,  UpdatedAt) values 
                            (@Id, @Date, @Kind, @PercentageWorkHours, @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }

        public async Task<CalendarDayModel> UpdateAsync(CalendarDayModel model)
        {
            var previousModel = await GetByIdAsync(model.Id);
            if (previousModel == null)
                throw new Exception("Calendar day not found");
            model.UpdatedAt = DateTime.Now;
            string query = @"update CalendarDays
                            SET Date = @Date, Kind = @Kind, PercentageWorkHours = @PercentageWorkHours, UpdatedAt = @UpdatedAt
                            WHERE Id = @Id";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
            }
            return model;
        }

        public async Task<CalendarDayModel> RemoveAsync(Guid id)
        {
            var previousModel = await GetByIdAsync(id);
            if (previousModel == null)
                throw new Exception("Calendar day not found");
            string query = "delete from CalendarDays where Id = @id";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
                return previousModel;
            }
        }

        public async Task<CalendarDayModel> RemoveAsync(DateTime date)
        {
            var previousModel = await GetByDateAsync(date);
            if (previousModel == null)
                throw new Exception("Calendar day not found");
            string query = "delete from CalendarDays where Date = @date";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { date });
                return previousModel;
            }
        }
    }
}
