using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Business.Abstractions;

namespace TimeTracker.Business.Models
{
    public class TrackModel : BaseModel
    {
        public Guid UserId { get; set; }
        public string? Title { get; set; }
        public TrackKind Kind { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
