using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models.UserFilter;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UserFilterType : InputObjectGraphType<UserFilter>
    {
        public UserFilterType()
        {
            Field<StringGraphType, string>()
            .Name("Email")
            .Resolve(context => context.Source.Email);

            Field<StringGraphType, string>()
            .Name("FirstName")
            .Resolve(context => context.Source.FirstName);

            Field<StringGraphType, string>()
            .Name("LastName")
            .Resolve(context => context.Source.LastName);

            Field<StringGraphType, string>()
            .Name("MiddleName")
            .Resolve(context => context.Source.MiddleName);

            Field<ListGraphType<PermissionType>, IEnumerable<Permission>>()
            .Name("Permissions")
            .Resolve(context => context.Source.Permissions);

            Field<ListGraphType<RoleType>, IEnumerable<Role>>()
            .Name("Roles")
            .Resolve(context => context.Source.Roles);

        }
    }
}
