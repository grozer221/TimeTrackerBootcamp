using GraphQL.Types;
using TimeTracker.Business.Filters;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave.DTO
{
    public class SickLeaveGetInput
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public SickLeaveFilter Filter { get; set; } 
    }

    public class SickLeaveGetInputType : InputObjectGraphType<SickLeaveGetInput>
    {
        public SickLeaveGetInputType()
        {
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("PageNumber")
                 .Resolve(context => context.Source.PageNumber);

            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("PageSize")
                 .Resolve(context => context.Source.PageSize);

            Field<NonNullGraphType<SickLeaveFilterType>, SickLeaveFilter>()
                .Name("Filter")
                .Resolve(context => context.Source.Filter);
        }
    }
}
