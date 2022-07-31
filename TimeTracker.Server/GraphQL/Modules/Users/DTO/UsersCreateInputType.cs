using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersCreateInput : IModelable<UserModel>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public IEnumerable<Permission> Permissions { get; set; }
        public IEnumerable<Guid> UsersWhichCanApproveVocationRequestIds { get; set; }
        public Employment Employment { get; set; }


        public UserModel ToModel()
        {
            return new UserModel
            {
                Email = this.Email,
                Password = this.Password,
                FirstName = this.FirstName,
                LastName = this.LastName,
                MiddleName = this.MiddleName,
                Permissions = this.Permissions,
                Employment = this.Employment,
            };
        }
    }

    public class UsersCreateInputType : InputObjectGraphType<UsersCreateInput>
    {
        public UsersCreateInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("Email")
                 .Resolve(context => context.Source.Email);

            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("Password")
                 .Resolve(context => context.Source.Password);
            
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
            
            Field<NonNullGraphType<EmploymentType>, Employment>()
                 .Name("Employment")
                 .Resolve(context => context.Source.Employment);
            
            Field<NonNullGraphType<ListGraphType<GuidGraphType>>, IEnumerable<Guid>>()
                 .Name("UsersWhichCanApproveVocationRequestIds")
                 .Resolve(context => context.Source.UsersWhichCanApproveVocationRequestIds);
        }
    }
}
