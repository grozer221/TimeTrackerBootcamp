namespace TimeTracker.Server.Abstractions
{
    public interface INotificationService
    {
        Task SendMessageAsync(string to, string title, string message);
    }
}
