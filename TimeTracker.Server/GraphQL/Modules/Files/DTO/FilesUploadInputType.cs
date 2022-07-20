using GraphQL.Types;
using GraphQL.Upload.AspNetCore;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class FilesUploadInput
    {
        public IEnumerable<IFormFile> Files { get; set; }
    }

    public class FilesUploadInputType : InputObjectGraphType<FilesUploadInput>
    {
        public FilesUploadInputType()
        {
            Field<NonNullGraphType<ListGraphType<UploadGraphType>>, IEnumerable<IFormFile>?>()
                .Name("Files")
                .Resolve(context => context.Source.Files);
        }
    }
}
