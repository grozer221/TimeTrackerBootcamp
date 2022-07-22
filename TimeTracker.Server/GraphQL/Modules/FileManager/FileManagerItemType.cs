using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.FileManager
{
    public class FileManagerItemType : ObjectGraphType<FileManagerItem>
    {
        public FileManagerItemType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("Name")
                .Resolve(context => context.Source.Name);

            Field<StringGraphType, string>()
               .Name("Path")
               .Resolve(context => context.Source.Path);

            Field<StringGraphType, string>()
                .Name("CreatedAt")
                .Resolve(context => context.Source.CreatedAt);
            
            Field<NonNullGraphType<FileManagerItemKindType>, FileManagerItemKind>()
                .Name("Kind")
                .Resolve(context => context.Source.Kind);
            
            Field<NonNullGraphType<FileManagerItemPermissionsType>, FileManagerItemPermissions>()
                .Name("Permissions")
                .Resolve(context => context.Source.Permissions);
        }
    }
}
