using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Chat.DTO;

namespace TimeTracker.Server.GraphQL.Modules.Chat
{
    public class ChatMutation : ObjectGraphType
    {
        public ChatMutation(IHttpContextAccessor httpContextAccessor, IMessageRepository messageRepository)
        {
            Field<StringGraphType>()
                .Name("Remove")
                .Argument<GuidGraphType, Guid>("Id", "Argument for delete message")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("Id");
                    var userId = httpContextAccessor.HttpContext.GetUserId();
                    var model = await messageRepository.GetByIdAsync(id);
                    if (model.UserIdFrom != userId)
                        if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions())
                            throw new ExecutionError("You do not have permissions for delete others tracks");

                    await messageRepository.RemoveAsync(id);

                    return "Deleted";
                }).AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<MessageType>, MessageModel>()
                .Name("Update")
                .Argument<NonNullGraphType<MessageUpdateInputType>, MessageUpdateInput>("MessageInput", "Argument for update message")
                .ResolveAsync(async context =>
                {
                    var message = context.GetArgument<MessageUpdateInput>("MessageInput");
                    var currentUserId = httpContextAccessor.HttpContext.GetUserId();
                    var model = await messageRepository.GetByIdAsync(message.Id);

                    if (message.Message != null)
                        model.Message = message.Message;
                    if (message.IsRead != false)
                        model.IsRead = message.IsRead;

                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions() && model.UserIdFrom != currentUserId)
                        throw new ExecutionError("You do not have permissions for update others tracks");

                    return await messageRepository.UpdateAsync(model);
                }).AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
