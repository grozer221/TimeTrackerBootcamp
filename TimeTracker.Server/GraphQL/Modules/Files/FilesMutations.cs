using GraphQL;
using GraphQL.Types;
using TimeTracker.Server.Abstractions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Settings.DTO;

namespace TimeTracker.Server.GraphQL.Modules.Files
{
    public class FilesMutations : ObjectGraphType
    {
        public FilesMutations(IHttpContextAccessor httpContextAccessor, IFileUploadService fileUploadService)
        {
            Field<NonNullGraphType<ListGraphType<StringGraphType>>, IEnumerable<string>>()
               .Name("Upload")
               .Argument<NonNullGraphType<FilesUploadInputType>, FilesUploadInput>("FilesUploadInputType", "Argument for update employment settings")
               .ResolveAsync(async context =>
               {
                   var filesUploadInput = context.GetArgument<FilesUploadInput>("FilesUploadInputType");
                   var filesNames = new List<string>();
                   foreach (var file in filesUploadInput.Files)
                   {
                       var fileName = await fileUploadService.UploadFileAsync(file);
                       filesNames.Add(fileName);
                   }
                   return filesNames;
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
