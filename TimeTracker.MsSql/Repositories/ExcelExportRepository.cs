using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;
using TimeTracker.Business.Models.Filters;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Repositories
{
    public class ExcelExportRepository : IExcelExportRepository
    {
        private readonly DapperContext dapperContext;

        public ExcelExportRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<IEnumerable<UserModel>> GetAsync(UserFilter filter, DateTime date)
        {
            IEnumerable<UserModel> users;
            string email = "%" + filter.Email + "%";
            string firstname = "%" + filter.FirstName + "%";
            string lastname = "%" + filter.LastName + "%";
            string middlename = "%" + filter.MiddleName + "%";
            var allPremisions = filter.Permissions?.Select(p => p.ToString()).ToArray();
            var permissionsCount = filter.Permissions?.Count();
            var rolesNumbers = filter.Roles;
            var employments = filter.Employments;

            string query = @"SELECT * FROM Users WHERE FirstName like @firstname
                             and LastName like @lastname
                             and MiddleName like @middlename
                             and Email like @email ";

            if (filter.Roles != null && filter.Roles.Count() != 0)
                query += "and RoleNumber in @rolesNumbers ";

            if (filter.Permissions != null && filter.Permissions.Count() != 0)
                query += @"and @permissionsCount = (select count(value) from OPENJSON(PermissionsString) where value in @allPremisions) ";

            if (filter.Employments != null && filter.Employments.Count() != 0)
                query += "and Employment in @employments ";

            using IDbConnection db = dapperContext.CreateConnection();
            users = await db.QueryAsync<UserModel>(query, new { email, firstname, lastname, middlename, allPremisions, permissionsCount, rolesNumbers, employments });

            return users;
        }

        public async Task GetUserHours(Guid userId, DateTime date, ExcelModel model)
        {
            IEnumerable<TrackModel> tracks;
            var month = date.Month;
            var year = date.Year;

            using (var connection = dapperContext.CreateConnection())
            {
                tracks = await connection.QueryAsync<TrackModel>("SELECT * FROM Tracks WHERE UserId = @UserId AND MONTH(StartTime) = @month AND YEAR(StartTime) = @year", new { userId, month, year });
            }

            foreach (var track in tracks)
            {
                if (track.EndTime != null)
                {
                    switch (track.Kind)
                    {
                        case (Business.Enums.TrackKind.Default):
                            var workTime = track.EndTime - track.StartTime;
                            model.WorkerHours += workTime!.Value.TotalHours;
                            break;
                        case (Business.Enums.TrackKind.Vacation):
                            var vacationTime = track.EndTime - track.StartTime;
                            model.VacantionHours += vacationTime!.Value.TotalHours;
                            break;
                        case (Business.Enums.TrackKind.Sick):
                            var sickTime = track.EndTime - track.StartTime;
                            model.VacantionHours += sickTime!.Value.TotalHours;
                            break;
                    }
                           
                }
            }

        }
    }
}
