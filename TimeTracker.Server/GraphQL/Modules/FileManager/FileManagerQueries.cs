using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.Services;

namespace TimeTracker.Server.GraphQL.Modules.FileManager
{
    public class FileManagerQueries : ObjectGraphType
    {
        public FileManagerQueries(FileManagerService fileManagerService, IHttpContextAccessor httpContextAccessor)
        {
            Field<NonNullGraphType<ListGraphType<FileManagerItemType>>, IEnumerable<FileManagerItem>>()
                .Name("GetInFolder")
                .Argument<NonNullGraphType<StringGraphType>, string>("FolderPath", "Argument for get in directory")
                .ResolveAsync(async context =>
                {
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateFileManager))
                        throw new ExecutionError("You do not have permissions for get in folder in file manager");
                    var folder = context.GetArgument<string>("FolderPath");
                    return await fileManagerService.GetInFolderAsync(folder);
                })
                .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
