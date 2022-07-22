using GraphQL.Types;
using GraphQL.Upload.AspNetCore;

namespace TimeTracker.Server.GraphQL.Modules.FileManager.DTO
{
    public class FileManagerUploadFilesInput
    {
        public string FolderPath { get; set; }
        public IEnumerable<IFormFile> Files { get; set; }
    }

    public class FileManagerUploadFilesInputType : InputObjectGraphType<FileManagerUploadFilesInput>
    {
        public FileManagerUploadFilesInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("FolderPath")
                .Resolve(context => context.Source.FolderPath);
            
            Field<NonNullGraphType<ListGraphType<UploadGraphType>>, IEnumerable<IFormFile>>()
                .Name("Files")
                .Resolve(context => context.Source.Files);
        }
    }
}
