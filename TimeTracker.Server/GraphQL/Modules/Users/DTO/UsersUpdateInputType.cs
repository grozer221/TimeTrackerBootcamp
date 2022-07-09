using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersUpdateInput : IModelable<UserModel>
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Role { get; private set; }
        public Role RoleEnum
        {
            get => Enum.Parse<Role>(Role);
            set => Role = value.ToString();
        }

        public UserModel ToModel()
        {
            return new UserModel
            {
                Id = this.Id,
                Email = this.Email,
                FirstName = this.FirstName,
                LastName = this.LastName,
                MiddleName = this.MiddleName,
                RoleEnum = this.RoleEnum,
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
            
            Field<NonNullGraphType<RoleType>, Role>()
                 .Name("RoleEnum")
                 .Resolve(context => context.Source.RoleEnum);
        }
    }
}
