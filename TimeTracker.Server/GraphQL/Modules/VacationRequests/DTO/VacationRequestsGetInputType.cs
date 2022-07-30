using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Filters;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsGetInput
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public VacationRequestsFilter Filter { get; set; }
    }

    public class VacationRequestsGetInputType : InputObjectGraphType<VacationRequestsGetInput>
    {
        public VacationRequestsGetInputType()
        {
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("PageNumber")
                 .Resolve(context => context.Source.PageNumber);
            
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("PageSize")
                 .Resolve(context => context.Source.PageSize);
            
            Field<NonNullGraphType<VacationRequestsFilterInputType>, VacationRequestsFilter>()
                 .Name("Filter")
                 .Resolve(context => context.Source.Filter);
        }
    }
}
