using Dapper;
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

        public async Task<GetEntitiesResponse<UserModel>> GetAsync(string like, int take, int skip)
        {
            like = "%" + like + "%";

            string getCountQuery = @"select count(*) FROM Users 
                                    where Email like @like";

            string getEntitieQuery = @"select * FROM Users 
                                     where Email like @like 
                                     ORDER BY Id
                                     OFFSET @skip ROWS FETCH NEXT @take ROWS ONLY";
            using (var connection = dapperContext.CreateConnection())
            {
                var reader = await connection.QueryMultipleAsync($"{getCountQuery};{getEntitieQuery}", new { like, take, skip });
                int total = reader.Read<int>().FirstOrDefault();
                var users = reader.Read<UserModel>();
                return new GetEntitiesResponse<UserModel>
                {
                    Entities = users,
                    Total = total,
                    PageSize = take,
                };
            }
        }

        public async Task<UserModel> CreateAsync(UserModel model)
        {
            model.Id = Guid.NewGuid();
            DateTime dateTimeNow = DateTime.Now;
            model.CreatedAt = dateTimeNow;
            model.UpdatedAt = dateTimeNow;
            string query = $@"insert into Users 
                            (Id, Email, Password, FirstName, LastName, MiddleName, RoleNumber, PermissionsString, Employment, AmountHoursPerMonth, CreatedAt, UpdatedAt) values 
                            (@Id, @Email, @Password, @FirstName, @LastName, @MiddleName, @RoleNumber, @PermissionsString, @Employment, @AmountHoursPerMonth, @CreatedAt, @UpdatedAt)";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
                return model;
            }
        }

        public async Task UpdatePasswordAsync(Guid id, string password)
        {
            var previousModel = await GetByIdAsync(id);
            if (previousModel == null)
                throw new Exception("User not found");
            string query = @"update Users
                            SET Password = @Password
                            WHERE Id = @Id";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new {id, password});
            }
        }

        public async Task<UserModel> UpdateAsync(UserModel model)
        {
            var previousModel = await GetByIdAsync(model.Id);
            if (previousModel == null)
                throw new Exception("User not found");
            model.UpdatedAt = DateTime.Now;
            string query = @"update Users
                            SET Email = @Email, FirstName = @FirstName, LastName = @LastName, 
                                MiddleName = @MiddleName, PermissionsString = @PermissionsString, 
                                Employment = @Employment, AmountHoursPerMonth = @AmountHoursPerMonth
                            WHERE Id = @Id";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, model);
            }
            return model;
        }

        public async Task<UserModel> RemoveAsync(string email)
        {
            var previousModel = await GetByEmailAsync(email);
            if (previousModel == null)
                throw new Exception("User not found");
            string query = "delete from Users where email = @email";
            using (var connection = dapperContext.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { email });
                return previousModel;
            }
        }
    }
}
