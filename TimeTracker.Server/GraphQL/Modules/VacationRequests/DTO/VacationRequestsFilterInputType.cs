using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Filters;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsFilterInputType : InputObjectGraphType<VacationRequestsFilter>
    {
        public VacationRequestsFilterInputType()
        {
            Field<NonNullGraphType<ListGraphType<VacationRequestStatusType>>, IEnumerable<VacationRequestStatus>>()
               .Name("Statuses")
               .Resolve(context => context.Source.Statuses);
            
            Field<NonNullGraphType<ListGraphType<GuidGraphType>>, IEnumerable<Guid>>()
               .Name("UserIds")
               .Resolve(context => context.Source.UserIds);
            
            Field<NonNullGraphType<VacationRequestsFilterKindType>, VacationRequestsFilterKind>()
               .Name("Kind")
               .Resolve(context => context.Source.Kind);
        }
    }
    
    public class VacationRequestsFilterKindType : EnumerationGraphType<VacationRequestsFilterKind>
    {
    }
}
