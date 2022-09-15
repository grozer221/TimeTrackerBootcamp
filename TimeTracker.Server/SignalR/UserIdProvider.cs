using Microsoft.AspNetCore.SignalR;
using TimeTracker.Server.Extensions;

namespace TimeTracker.Server.SignalR
{
    public class UserIdProvider : IUserIdProvider
    {
        IHttpContextAccessor httpContextAccessor;
        public UserIdProvider(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }
        public string? GetUserId(HubConnectionContext connection)
        {
            return httpContextAccessor.HttpContext.GetUserId().ToString();
        }
    }
}
