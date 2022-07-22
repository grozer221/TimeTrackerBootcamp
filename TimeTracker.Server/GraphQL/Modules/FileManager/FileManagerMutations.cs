using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.FileManager.DTO;
using TimeTracker.Server.Services;

namespace TimeTracker.Server.GraphQL.Modules.FileManager
{
    public class FileManagerMutations : ObjectGraphType
    {
        public FileManagerMutations(FileManagerService fileManagerService, IHttpContextAccessor httpContextAccessor)
        {
            Field<NonNullGraphType<BooleanGraphType>, bool>()
                .Name("CreateFolder")
                .Argument<NonNullGraphType<FileManagerCreateFolderInputType>, FileManagerCreateFolderInput>("FileManagerCreateFolderInputType", "Argument for get in directory")
                .ResolveAsync(async context =>
                {
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateFileManager))
                        throw new ExecutionError("You do not have permissions for create folder in file manager");
                    var fileManagerCreateFolderInput = context.GetArgument<FileManagerCreateFolderInput>("FileManagerCreateFolderInputType");
                    var folderPath = $"{fileManagerCreateFolderInput.FolderPath}/{fileManagerCreateFolderInput.NewFolderName}";
                    await fileManagerService.CreateFolderAsync(folderPath);
                    return true;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<ListGraphType<FileManagerItemType>>, IEnumerable<FileManagerItem>>()
                .Name("UploadFiles")
                .Argument<NonNullGraphType<FileManagerUploadFilesInputType>, FileManagerUploadFilesInput>("FileManagerUploadFilesInputType", "Argument for update employment settings")
                .ResolveAsync(async context =>
                {
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateFileManager))
                        throw new ExecutionError("You do not have permissions for upload files in file manager");
                    var fileManagerUploadFilesInput = context.GetArgument<FileManagerUploadFilesInput>("FileManagerUploadFilesInputType");
                    var fileManagerItems = new List<FileManagerItem>();
                    foreach (var file in fileManagerUploadFilesInput.Files)
                    {
                        var fileManagerItem = await fileManagerService.UploadFileAsync(fileManagerUploadFilesInput.FolderPath, file);
                        fileManagerItems.Add(fileManagerItem);
                    }
                    return fileManagerItems;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<FileManagerItemType>, FileManagerItem>()
                .Name("RenameFile")
                .Argument<NonNullGraphType<FileManagerRenameInputType>, FileManagerRenameInput>("FileManagerRenameInputType", "Argument for update employment settings")
                .ResolveAsync(async context =>
                {
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateFileManager))
                        throw new ExecutionError("You do not have permissions for rename files in file manager");
                    var fileManagerRenameInput = context.GetArgument<FileManagerRenameInput>("FileManagerRenameInputType");
                    return await fileManagerService.RenameFileAsync(fileManagerRenameInput.FromPath, fileManagerRenameInput.ToName); ;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);
            
            Field<NonNullGraphType<BooleanGraphType>, bool>()
                .Name("Remove")
                .Argument<NonNullGraphType<FileManagerRemoveInputType>, FileManagerRemoveInput>("FileManagerRemoveInputType", "Argument for update employment settings")
                .ResolveAsync(async context =>
                {
                    if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateFileManager))
                        throw new ExecutionError("You do not have permissions for remove in file manager");
                    var fileManagerRemoveInput = context.GetArgument<FileManagerRemoveInput>("FileManagerRemoveInputType");
                    switch (fileManagerRemoveInput.Kind)
                    {
                        case FileManagerItemKind.File:
                            await fileManagerService.RemoveFileAsync(fileManagerRemoveInput.Path);
                            break;
                        case FileManagerItemKind.Folder:
                            await fileManagerService.RemoveFolderAsync(fileManagerRemoveInput.Path);
                            break;
                        default:
                            throw new NotImplementedException();
                    }
                    return true;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
