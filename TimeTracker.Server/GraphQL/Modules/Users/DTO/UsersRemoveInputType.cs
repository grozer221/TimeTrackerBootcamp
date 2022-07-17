using GraphQL.Types;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Users.DTO
{
    public class UsersRemoveInput
    {
        public string Email { get; set; }
    }

    public class UsersRemoveInputType : InputObjectGraphType<UsersRemoveInput>
    {
        public UsersRemoveInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                 .Name("Email")
                 .Resolve(context => context.Source.Email);
        }
    }
}
