using TimeTracker.Business.Models;

namespace TimeTracker.Server.Abstractions
{
    public interface IChatHub
    {
        Task ReceiveMessage(MessageModel message);
    }
}
