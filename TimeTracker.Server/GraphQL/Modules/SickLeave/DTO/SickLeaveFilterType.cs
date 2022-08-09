using GraphQL.Types;
using TimeTracker.Business.Filters;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave.DTO
{
    public class SickLeaveFilterType : InputObjectGraphType<SickLeaveFilter>
    {
        public SickLeaveFilterType()
        {
            Field<NonNullGraphType<SickLeaveFilterKindType>, SickLeaveFilterKind>()
               .Name("Kind")
               .Resolve(context => context.Source.Kind);
        }
    }

    public class SickLeaveFilterKindType : EnumerationGraphType<SickLeaveFilterKind>
    {
    }
}
