using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthRegisterInput
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
    }

    public class AuthRegisterInputType : InputObjectGraphType<AuthRegisterInput>
    {
        public AuthRegisterInputType()
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
        }
    }
}
