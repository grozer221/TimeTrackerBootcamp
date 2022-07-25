using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthResetPasswordInput
    {
        public string Password { get; set; }
        public string Token { get; set; }
    }

    public class AuthResetPasswordInputType : InputObjectGraphType<AuthResetPasswordInput>
    {
        public AuthResetPasswordInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("Password")
                .Resolve(context => context.Source.Password);

            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("Token")
                .Resolve(context => context.Source.Token);
        }
    }

}
