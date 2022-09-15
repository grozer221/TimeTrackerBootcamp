using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Models;

namespace TimeTracker.Business.Repositories
{
    public interface IMessageRepository
    {
        Task<MessageModel> GetByIdAsync(Guid id);
        Task<IEnumerable<MessageModel>> GetAsync();
        Task<IEnumerable<MessageModel>> GetDialogAsync(Guid user1, Guid user2);
        Task<IEnumerable<MessageModel>> GetByUserAsync(Guid userId);
        Task<MessageModel> CreateAsync(MessageModel model);
        Task<MessageModel> UpdateAsync(MessageModel model);
        Task RemoveAsync(Guid id);
        
    }
}
