using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.FileManager.DTO
{
    public class FileManagerRemoveInput
    {
        public string Path { get; set; }
        public FileManagerItemKind Kind { get; set; }
    }
    
    public class FileManagerRemoveInputType : InputObjectGraphType<FileManagerRemoveInput>
    {
        public FileManagerRemoveInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("Path")
                .Resolve(context => context.Source.Path);
            
            Field<NonNullGraphType<FileManagerItemKindType>, FileManagerItemKind>()
                .Name("Kind")
                .Resolve(context => context.Source.Kind);
        }
    }
}
