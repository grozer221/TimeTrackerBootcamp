using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.FileManager.DTO
{
    public class FileManagerRenameInput
    {
        public string FromPath { get; set; }
        public string ToName { get; set; }
    }
    
    public class FileManagerRenameInputType : InputObjectGraphType<FileManagerRenameInput>
    {
        public FileManagerRenameInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("FromPath")
                .Resolve(context => context.Source.FromPath);
            
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("ToName")
                .Resolve(context => context.Source.ToName);
        }
    }
}
