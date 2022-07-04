using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthLoginInput
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class AuthLoginInputType : InputObjectGraphType<AuthLoginInput>
    {
        public AuthLoginInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
               .Name("Email")
               .Resolve(context => context.Source.Email);

            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("Password")
                .Resolve(context => context.Source.Password);
        }
    }
}
