using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IUserRepository : IRepository<UserModel>
    {
    }
}
