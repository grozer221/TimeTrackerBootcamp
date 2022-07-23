using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IResetTokenRepository
    {
        Task<TokenModel> GetByTokenAsync(string token);
        Task<TokenModel> CreateAsync(TokenModel model);
        Task RemoveAsync(Guid userId, string token);

    }
}
