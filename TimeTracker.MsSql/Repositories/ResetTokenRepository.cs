using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;

namespace TimeTracker.MsSql.Repositories
{
    public class ResetTokenRepository : IResetTokenRepository
    {
        private readonly DapperContext dapperContext;

        public ResetTokenRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<TokenModel> GetByTokenAsync(string token)
        {
            string query = $"select * from ResetTokens where token = @token";
            using (var connection = dapperContext.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<TokenModel>(query, new { token });
            }
        }

        public async Task<TokenModel> CreateAsync(TokenModel model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.Now;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into ResetTokens 
                            (Id, Token, UserId, CreatedAt, UpdatedAt) 
                            values (@Id, @Token, @UserId, @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }

        public async Task RemoveAsync(Guid userId, string token)
        {
            string query = "delete from ResetTokens where userId = @userId and token = @token";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { userId, token });
            }
        }
    }
}
