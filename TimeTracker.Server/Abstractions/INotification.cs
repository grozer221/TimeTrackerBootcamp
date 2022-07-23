using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeTracker.Server.Abstractions
{
    public interface INotification
    {
        Task SendMessageAsync(string to, string title, string message);
    }
}
