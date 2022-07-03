using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Users
{
    public class UserType : BaseType<UserModel>
    {
        public UserType(IServiceProvider serviceProvider) : base()
        {
            Field<StringGraphType, string>()
               .Name("FirstName")
               .Resolve(context => context.Source.FirstName);

            Field<StringGraphType, string>()
               .Name("LastName")
               .Resolve(context => context.Source.LastName);

            Field<StringGraphType, string>()
               .Name("MiddleName")
               .Resolve(context => context.Source.MiddleName);

            Field<NonNullGraphType<StringGraphType>, string>()
               .Name("Email")
               .Resolve(context => context.Source.Email);

            Field<NonNullGraphType<RoleType>, Role>()
               .Name("Role")
               .Resolve(context => context.Source.RoleEnum);
        }
    }
    public class RoleType : EnumerationGraphType<Role>
    {
    }
}
