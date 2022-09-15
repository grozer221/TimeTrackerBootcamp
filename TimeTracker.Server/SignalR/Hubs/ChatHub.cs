using Microsoft.AspNetCore.SignalR;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Abstractions;

namespace TimeTracker.Server.SignalR.Hubs
{
    public class ChatHub : Hub<IChatHub>
    {
        IMessageRepository messageRepository;

        public ChatHub(IMessageRepository messageRepository)
        {
            this.messageRepository = messageRepository;
        }
        public async Task SendMessage(MessageModel message)
        {
            message.Id = Guid.NewGuid();
            message.UserIdFrom = Guid.Parse(Context.UserIdentifier);
            await messageRepository.CreateAsync(message);
            await Clients.User(message.UserIdTo.ToString()).ReceiveMessage(message);
        }
    }
}
