using TimeTracker.Business.Abstractions;

namespace TimeTracker.Business.Models
{
    public class Users_UsersWhichCanApproveVocationRequests : BaseModel
    {
        public Guid UserId { get; set; }
        public Guid UserWhichCanApproveVocationRequestId { get; set; }
    }
}
