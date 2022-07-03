using GraphQL.Types;
using TimeTracker.Business.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Abstractions
{
    public class BaseType<T> : ObjectGraphType<T> where T : BaseModel
    {
        public BaseType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
               .Name("Id")
               .Resolve(context => context.Source.Id);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime>()
                .Name("CreatedAt")
                .Resolve(context => context.Source.CreatedAt);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime>()
               .Name("UpdatedAt")
               .Resolve(context => context.Source.UpdatedAt);
        }
    }
}
