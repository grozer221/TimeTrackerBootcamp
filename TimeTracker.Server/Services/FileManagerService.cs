using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using TimeTracker.Server.GraphQL.Modules.FileManager;

namespace TimeTracker.Server.Services
{
    public class FileManagerService 
    {
        private readonly Cloudinary cloudinary;

        public FileManagerService()
        {
            cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
        }

        public async Task<IEnumerable<FileManagerItem>> GetInFolderAsync(string folderPath)
        {
            var searchFolders = string.IsNullOrEmpty(folderPath)
                ? await cloudinary.RootFoldersAsync() 
                : await cloudinary.SubFoldersAsync(folderPath);
            var folders = searchFolders.Folders?.Select(f => new FileManagerItem
            {
                Name = f.Name,
                Path = f.Path,
                Kind = FileManagerItemKind.Folder
            });
            var searchFiles = await cloudinary.Search()
                .Expression($"folder:\"{folderPath}\"")
                .SortBy("created_at", "desc")
                .ExecuteAsync();
            var files = searchFiles.Resources?.Select(r => new FileManagerItem
            {
                Name = r.FileName,
                Path = r.Url,
                CreatedAt = r.CreatedAt,
                Kind = FileManagerItemKind.File,
            });
            var result = new List<FileManagerItem>();
            if(folders != null)
                result.AddRange(folders);
            if(files != null)
                result.AddRange(files);
            return result;
        }

        public async Task CreateFolderAsync(string folderPath)
        {
            await cloudinary.CreateFolderAsync(folderPath);
        }

        public async Task<FileManagerItem> UploadFileAsync(string folderPath, IFormFile file)
        {
            string filePath = String.IsNullOrEmpty(folderPath) ? file.FileName : $"{folderPath}/{file.FileName}";
            Stream stream = file.OpenReadStream();
            var uploadParams = new RawUploadParams
            {
                File = new FileDescription(filePath, stream),
                PublicId = filePath,
                Overwrite = false,
            };
            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            if (uploadResult.Error != null)
                throw new Exception(uploadResult.Error.Message);
            return new FileManagerItem
            {
                Name = uploadResult.OriginalFilename,
                Path = uploadResult.Url.ToString(),
                Kind = FileManagerItemKind.File,
                CreatedAt = uploadResult.CreatedAt.ToString(),
            };
        }

        public async Task RemoveAsync(string url)
        {
        }
    }
}
