using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.FileManager.DTO
{
    public class FileManagerCreateFolderInput
    {
        public string FolderPath { get; set; }
        public string NewFolderName { get; set; }
    }
    
    public class FileManagerCreateFolderInputType : InputObjectGraphType<FileManagerCreateFolderInput>
    {
        public FileManagerCreateFolderInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("FolderPath")
                .Resolve(context => context.Source.FolderPath);
            
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("NewFolderName")
                .Resolve(context => context.Source.NewFolderName);
        }
    }
}
