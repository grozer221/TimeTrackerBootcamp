using GraphQL.Types;


namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthRequestResetPasswordInput
    {
        public string Email { get; set; }
    }

    public class AuthRequestResetPasswordInputType : InputObjectGraphType<AuthRequestResetPasswordInput>
    {
        public AuthRequestResetPasswordInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("Email")
                .Resolve(context => context.Source.Email);
        }
    }
}
