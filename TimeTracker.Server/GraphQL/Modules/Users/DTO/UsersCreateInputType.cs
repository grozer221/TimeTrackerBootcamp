using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersCreateInput : IModelable<UserModel>
    {
        public string Email { get; set; }
        public string Password { get; set; }
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
                Email = this.Email,
                Password = this.Password,
                FirstName = this.FirstName,
                LastName = this.LastName,
                MiddleName = this.MiddleName,
                RoleEnum = this.RoleEnum,
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
            
            Field<NonNullGraphType<RoleType>, Role>()
                 .Name("RoleEnum")
                 .Resolve(context => context.Source.RoleEnum);
        }
    }
}
