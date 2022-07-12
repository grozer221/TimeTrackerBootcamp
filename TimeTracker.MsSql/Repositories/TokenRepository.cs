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
    public class TokenRepository : ITokenRepository
    {
        private readonly DapperContext dapperContext;

        public TokenRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<TokenModel> GetByIdAsync(Guid id)
        {
            string query = $"select * from Tokens where id = @id";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<TokenModel>(query, new { id });
            }
        }

        public async Task<TokenModel> GetByToken(string token)
        {
            string query = $"select * from Tokens where token = @token";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<TokenModel>(query, new { token });
            }
        }

        public async Task<IEnumerable<TokenModel>> GetByUserId(Guid userId)
        {
            string query = $"select * from Tokens where userId = @userId";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryAsync<TokenModel>(query, new { userId });
            }
        }

        public async Task<IEnumerable<TokenModel>> GetAsync()
        {
            string query = $"select * from Tokens";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryAsync<TokenModel>(query);
            }
        }

        public Task<GetEntitiesResponse<TokenModel>> GetAsync(string like, int take, int skip)
        {
            throw new NotImplementedException();
        }
        public async Task<TokenModel> CreateAsync(TokenModel model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.Now;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into Tokens 
                            (Id, Token, UserId, CreatedAt, UpdatedAt) 
                            values (@Id, @Token, @UserId, @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }

        public Task<TokenModel> UpdateAsync(TokenModel model)
        {
            throw new NotImplementedException();
        }

        public async Task<TokenModel> RemoveAsync(Guid id)
        {
            var previousModel = await GetByIdAsync(id);
            if (previousModel == null)
                throw new Exception("Token not found");
            string query = "delete from Tokens where Id = @id";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
                return previousModel;   
            }
        }

        public async Task RemoveAsync(Guid userId, string token)
        {
            string query = "delete from Tokens where userId = @userId and token = @token";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { userId, token });
            }
        }

        public async Task RemoveAllForUserAsync(Guid userId)
        {
            string query = "delete from Tokens where userId = @userId";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { userId });
            }
        }
    }
}
