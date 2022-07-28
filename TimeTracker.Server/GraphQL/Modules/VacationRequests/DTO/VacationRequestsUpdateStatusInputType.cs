using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsUpdateStatusInput
    {
        public Guid Id { get; set; }
        public VacationRequestStatus Status { get; set; }
    }

    public class VacationRequestsUpdateStatusInputType : InputObjectGraphType<VacationRequestsUpdateStatusInput>
    {
        public VacationRequestsUpdateStatusInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
               .Name("Id")
               .Resolve(context => context.Source.Id);

            Field<NonNullGraphType<VacationRequestStatusType>, VacationRequestStatus>()
               .Name("Status")
               .Resolve(context => context.Source.Status);
        }
    }
}
