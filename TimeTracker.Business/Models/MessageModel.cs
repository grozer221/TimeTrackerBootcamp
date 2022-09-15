using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Abstractions;

namespace TimeTracker.Business.Models
{
    public class MessageModel : BaseModel
    {
        public Guid UserIdTo { get; set; }
        public Guid UserIdFrom { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; } = false;
    }
}
