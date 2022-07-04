using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext dapperContext;

        public UserRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<UserModel> GetByIdAsync(Guid id)
        {
            string query = $"select * from Users where id = @id";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<UserModel>(query, new { id });
            }
        }

        public async Task<UserModel> GetByEmailAsync(string email)
        {
            string query = $"select * from Users where email = @email";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<UserModel>(query, new { email });
            }
        }

        public async Task<IEnumerable<UserModel>> GetAsync()
        {
            string query = $"select * from Users";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryAsync<UserModel>(query);
            }
        }

        public Task<GetEntitiesResponse<UserModel>> GetAsync(string like, int take, int skip)
        {
            throw new NotImplementedException();
        }

        public async Task<UserModel> CreateAsync(UserModel model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.Now;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into Users 
                            (Id, Email, Password, FirstName, LastName, MiddleName, Role, CreatedAt, UpdatedAt) 
                            values (@Id, @Email, @Password, @FirstName, @LastName, @MiddleName, @Role, @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }

        public Task<UserModel> UpdateAsync(UserModel model)
        {
            throw new NotImplementedException();
        }

        public Task RemoveAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
