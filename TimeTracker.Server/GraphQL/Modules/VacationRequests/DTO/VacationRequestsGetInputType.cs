using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsGetInput
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
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
        }
    }
}
