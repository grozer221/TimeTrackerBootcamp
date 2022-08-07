using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave
{
    public class SickLeaveType : BaseType<SickLeaveModel>
    {
        public SickLeaveType(IServiceProvider serviceProvider) : base()
        {
            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("StartDate")
               .Resolve(context => context.Source.StartDate);

            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("EndDate")
               .Resolve(context => context.Source.EndDate);

            Field<StringGraphType, string?>()
               .Name("Comment")
               .Resolve(context => context.Source.Comment);

            Field<NonNullGraphType<GuidGraphType>, Guid>()
               .Name("UserId")
               .Resolve(context => context.Source.UserId);
        }
    }
}
