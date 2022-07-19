using Dapper;
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

        public async Task RemoveAsync(Guid userId, string token)
        {
            string query = "delete from Tokens where userId = @userId and token = @token";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { userId, token });
            }
        }

        public async Task RemoveAllForUserExceptTokenAsync(Guid userId, string token)
        {
            string query = "delete from Tokens where userId = @userId and token != @token";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { userId, token });
            }
        }
    }
}
