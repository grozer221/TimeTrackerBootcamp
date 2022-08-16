using Dapper;
using System.Data;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Extensions
{
    public static class ICalendarDayRepositoryExtensions
    {
        public static async Task<CalendarDayModel> CreateAsync(this ICalendarDayRepository calendarDayRepository, CalendarDayModel model, IDbConnection connection, IDbTransaction transaction = null)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.Now;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = @"insert into CalendarDays 
                            ( Id,  Title,  Date,  Kind,  WorkHours,  CreatedAt,  UpdatedAt) values 
                            (@Id, @Title, @Date, @Kind, @WorkHours, @CreatedAt, @UpdatedAt)";
            await connection.ExecuteAsync(query, model, transaction);
            return model;
        }
    }
}
