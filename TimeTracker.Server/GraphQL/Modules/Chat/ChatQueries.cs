using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.GraphQL.Modules.Chat
{
    public class ChatQueries : ObjectGraphType
    {
        public ChatQueries(IMessageRepository messageRepository, IHttpContextAccessor httpContextAccessor)
        {
            Field<ListGraphType<MessageType>, IEnumerable<MessageModel>>()
                .Name("Get")
                .ResolveAsync(async context =>
                {
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions())
                        throw new ExecutionError("You do not have permissions for get messages");
                    var messages = await messageRepository.GetAsync();
                    return messages;
                }).AuthorizeWith(AuthPolicies.Authenticated);

            Field<ListGraphType<MessageType>, IEnumerable<MessageModel>>()
                .Name("GetDialog")
                .Argument<GuidGraphType, Guid>("User1", "User1 of dialog")
                .Argument<GuidGraphType, Guid>("User2", "User2 of dialog")
                .ResolveAsync(async context =>
                {
                    var user = httpContextAccessor.HttpContext.GetUserId();
                    var user1 = context.GetArgument<Guid>("User1");
                    var user2 = context.GetArgument<Guid>("User2");
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions() || (user != user1 || user != user2))
                        throw new ExecutionError("You do not have permissions for get messages");
                    var messages = await messageRepository.GetDialogAsync(user1, user2);
                    return messages;
                }).AuthorizeWith(AuthPolicies.Authenticated);

            Field<ListGraphType<MessageType>, IEnumerable<MessageModel>>()
                .Name("GetByUser")
                .Argument<GuidGraphType, Guid>("User", "Get messeges by user")
                .ResolveAsync(async context =>
                {
                    var user = context.GetArgument<Guid>("User");
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions())
                        throw new ExecutionError("You do not have permissions for get messages");
                    var messages = await messageRepository.GetByUserAsync(user);
                    return messages;
                }).AuthorizeWith(AuthPolicies.Authenticated);

            Field<MessageType, MessageModel>()
                .Name("GetById")
                .Argument<GuidGraphType, Guid>("MessageId", "Get messeges by id")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("MessageId");
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions())
                        throw new ExecutionError("You do not have permissions for get messages");
                    var message = await messageRepository.GetByIdAsync(id);
                    return message;
                }).AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
