using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersUpdateInput : IModelable<UserModel>
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public IEnumerable<Permission> Permissions { get; set; }
        public IEnumerable<Guid> UsersWhichCanApproveVocationRequestIds { get; set; }

        public UserModel ToModel()
        {
            return new UserModel
            {
                Id = this.Id,
                Email = this.Email,
                FirstName = this.FirstName,
                LastName = this.LastName,
                MiddleName = this.MiddleName,
                Permissions = this.Permissions,
            };
        }
    }

    public class UsersUpdateInputType : InputObjectGraphType<UsersUpdateInput>
    {
        public UsersUpdateInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
                 .Name("Id")
                 .Resolve(context => context.Source.Id);

            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("Email")
                 .Resolve(context => context.Source.Email);

            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("FirstName")
                 .Resolve(context => context.Source.FirstName);

            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("LastName")
                 .Resolve(context => context.Source.LastName);

            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("MiddleName")
                 .Resolve(context => context.Source.MiddleName);

            Field<NonNullGraphType<ListGraphType<PermissionType>>, IEnumerable<Permission>>()
                .Name("Permissions")
                .Resolve(context => context.Source.Permissions);

            Field<NonNullGraphType<ListGraphType<GuidGraphType>>, IEnumerable<Guid>>()
                .Name("UsersWhichCanApproveVocationRequestIds")
                .Resolve(context => context.Source.UsersWhichCanApproveVocationRequestIds);
        }
    }
}
