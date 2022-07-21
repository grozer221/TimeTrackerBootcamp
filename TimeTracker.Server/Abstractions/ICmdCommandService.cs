namespace TimeTracker.Server.Abstractions
{
    public interface ICmdCommandService
    {
        public void Run(string directory, string command);
    }
}
