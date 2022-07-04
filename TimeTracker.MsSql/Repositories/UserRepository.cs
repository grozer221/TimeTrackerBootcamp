using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public Task<UserModel> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<UserModel>> GetAsync(string like, int take, int skip)
        {
            throw new NotImplementedException();
        }

        public Task<UserModel> CreateAsync(UserModel model)
        {
            throw new NotImplementedException();
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
