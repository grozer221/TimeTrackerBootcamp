using GraphQL.Types;
using TimeTracker.Business.Models;

namespace TimeTracker.Server.GraphQL.Modules.Chat.DTO
{
    public class MessageUpdateInput
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }

        public MessageModel ToModel()
        {
            var model = new MessageModel
            {
                Message = this.Message,
                IsRead = this.IsRead
            };

            return model;
        }
    }

    public class MessageUpdateInputType : InputObjectGraphType<MessageUpdateInput>
    {
        public MessageUpdateInputType()
        {
            Field<GuidGraphType, Guid>()
                .Name("Id")
                .Resolve(context => context.Source.Id);

            Field<StringGraphType, string>()
                .Name("Message")
                .Resolve(context => context.Source.Message);

            Field<BooleanGraphType, bool>()
                .Name("IsRead")
                .Resolve(context => context.Source.IsRead);
        }
    }
}
