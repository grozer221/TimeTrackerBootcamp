using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersUpdatePasswordInput
    {
        public Guid Id { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class UsersUpdatePasswordInputType : InputObjectGraphType<UsersUpdatePasswordInput>
    {
        public UsersUpdatePasswordInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
                 .Name("Id")
                 .Resolve(context => context.Source.Id);

            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("Password")
                 .Resolve(context => context.Source.Password);
            
            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("ConfirmPassword")
                 .Resolve(context => context.Source.ConfirmPassword);
            
        }
    }
}
