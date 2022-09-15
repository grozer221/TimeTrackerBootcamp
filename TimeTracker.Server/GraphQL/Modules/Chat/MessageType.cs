using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Chat
{
    public class MessageType : BaseType<MessageModel>
    {
        public MessageType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
                .Name("UserIdTo")
                .Resolve(context => context.Source.UserIdTo);

            Field<NonNullGraphType<GuidGraphType>, Guid>()
                .Name("UserIdFrom")
                .Resolve(context => context.Source.UserIdFrom);

            Field<StringGraphType, string>()
                .Name("Message")
                .Resolve(context => context.Source.Message);

            Field<BooleanGraphType, bool>()
                .Name("IsRead")
                .Resolve(context => context.Source.IsRead);
        }
    }
}
