using TimeTracker.Business.Enums;

namespace TimeTracker.Business.Filters
{
    public class VacationRequestsFilter
    {
        public IEnumerable<VacationRequestStatus> Statuses { get; set; }
        public IEnumerable<Guid> UserIds { get; set; }
    }
}
