namespace TimeTracker.Server.Abstractions
{
    public interface IFileUploadService
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task<string> UploadImageAsync(IFormFile image, string imageName, int width, int height);
        Task<string> UploadVideoAsync(IFormFile video, string videoName);
        Task RemoveAsync(string url);
    }
}
