namespace TimeTracker.Server.GraphQL.Modules.FileManager
{
    public class FileManagerItem
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public string CreatedAt { get; set; }
        public FileManagerItemKind Kind { get; set; }
    }
}
