using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;
using TimeTracker.MsSql;

namespace TimeTracker.Business.Repositories
{
    public class Users_UsersWhichCanApproveVocationRequestsRepository : IUsers_UsersWhichCanApproveVocationRequestsRepository
    {
        private readonly DapperContext dapperContext;

        public Users_UsersWhichCanApproveVocationRequestsRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<IEnumerable<UserModel>> GetUsersWhichCanApproveVacationRequests(Guid forUserId)
        {
            string query = @"select * from Users_UsersWhichCanApproveVocationRequests 
                                join Users on Users_UsersWhichCanApproveVocationRequests.UserWhichCanApproveVocationRequestId = Users.Id
                                where UserId = @UserId";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryAsync<UserModel, UserModel, UserModel>(query, (a, b) => b, new { userId = forUserId });
            }
        }

        public async Task<Users_UsersWhichCanApproveVocationRequests> CreateUsersWhichCanApproveVacationRequests(Users_UsersWhichCanApproveVocationRequests model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.Now;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into Users_UsersWhichCanApproveVocationRequests 
                            (Id,   UserId,  UserWhichCanApproveVocationRequestId,   CreatedAt,  UpdatedAt) values 
                            (@Id, @UserId, @UserWhichCanApproveVocationRequestId,  @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }

        public async Task RemoveUsersWhichCanApproveVacationRequests(Guid forUserId)
        {
            string query = "delete from Users_UsersWhichCanApproveVocationRequests where userId = @userId";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { userId = forUserId });
            }
        }
    }
}
