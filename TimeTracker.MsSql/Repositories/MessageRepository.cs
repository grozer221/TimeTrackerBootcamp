using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using Dapper;
using System.Data;

namespace TimeTracker.MsSql.Repositories
{
    internal class MessageRepository : IMessageRepository
    {
        private readonly DapperContext dapperContext;

        public MessageRepository(DapperContext dapperContext)
        {
            this.dapperContext = dapperContext;
        }

        public async Task<MessageModel> CreateAsync(MessageModel model)
        {
            model.CreatedAt = model.UpdatedAt = DateTime.UtcNow;

            var query = @"INSERT INTO Messages (Id, UserIdTo, UserIdFrom, Message, IsRead, CreatedAt, UpdatedAt)
                          VALUES (@Id, @UserIdTo, @UserIdFrom, @Message, @IsRead, @CreatedAt, @UpdatedAt)";

            using var connection = dapperContext.CreateConnection();
            await connection.ExecuteAsync(query, model);
            return model;
        }

        public async Task<IEnumerable<MessageModel>> GetAsync()
        {
            using var connection = dapperContext.CreateConnection();

            var messages = await connection.QueryAsync<MessageModel>("SELECT * FROM Messages");

            return messages;
        }

        public async Task<MessageModel> GetByIdAsync(Guid id)
        {
            using var connection = dapperContext.CreateConnection();

            var messages = await connection.QueryFirstOrDefaultAsync<MessageModel>("SELECT * FROM Messages WHERE Id = @Id", new {id});

            return messages;
        }

        public async Task<IEnumerable<MessageModel>> GetByUserAsync(Guid userId)
        {
            using var connection = dapperContext.CreateConnection();

            var messages = await connection.QueryAsync<MessageModel>("SELECT * FROM Messages WHERE UserIdFrom = @userId", new {userId});

            return messages;
        }

        public async Task<IEnumerable<MessageModel>> GetDialogAsync(Guid user1, Guid user2)
        {
            using var connection = dapperContext.CreateConnection();

            var messages = await connection.QueryAsync<MessageModel>(@"SELECT * FROM Messages WHERE (UserIdFrom = @user1 AND userIdTo = @user2) 
                                                                      OR (UserIdFrom = @user2 AND userIdTo = @user1) ORDER BY createdAt", new { user1, user2 });

            return messages;
        }

        public async Task RemoveAsync(Guid id)
        {
            using var connection = dapperContext.CreateConnection();
            await connection.ExecuteAsync("DELETE FROM Messages WHERE Id = @Id", new { id });

        }

        public async Task<MessageModel> UpdateAsync(MessageModel model)
        {
            model.UpdatedAt = DateTime.UtcNow;

            var query = @"UPDATE Messages SET Message = @Message, 
                        IsRead = @IsRead, UpdatedAt = @UpdatedAt WHERE Id = @Id";

            using var connection = dapperContext.CreateConnection();
            await connection.ExecuteAsync(query, model);
            return model;
        }
    }
}
