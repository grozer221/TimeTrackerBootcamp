using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthChangePasswordInput
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class AuthChangePasswordInputType : InputObjectGraphType<AuthChangePasswordInput>
    {
        public AuthChangePasswordInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
               .Name("OldPassword")
               .Resolve(context => context.Source.OldPassword);

            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("NewPassword")
                .Resolve(context => context.Source.NewPassword);
        }
    }
}
