using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using TimeTracker.Server.Abstractions;
using TimeTracker.Server.Extensions;

namespace TimeTracker.Server.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly Cloudinary cloudinary;

        public FileUploadService()
        {
            cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            string fileName = $"{DateTime.Now.ToString("dd.MM.yyyy-HH:mm:ss.fffffff")}_{file.FileName}";
            var uploadParams = CreateUploadParams<RawUploadParams>(file, $"{nameof(file)}s/{fileName}");
            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            return uploadResult.Url.ToString();
        }

        public async Task<string> UploadImageAsync(IFormFile image, string imageName, int width, int height)
        {
            var uploadParams = CreateUploadParams<ImageUploadParams>(image, $"{nameof(image)}s/{imageName}");
            uploadParams.Transformation = new Transformation()
                .Height(height).Width(width).Crop("scale");
            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            return uploadResult.Url.ToString();
        }

        public async Task<string> UploadVideoAsync(IFormFile video, string videoName)
        {
            var uploadParams = CreateUploadParams<VideoUploadParams>(video, $"{nameof(video)}s/{videoName}");
            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            return uploadResult.Url.ToString();
        }

        public async Task RemoveAsync(string url)
        {
            if (string.IsNullOrEmpty(url))
                return;
            ResourceType resourceType;
            if (!url.Contains("/files/"))
                url = url[..url.LastIndexOf(".")];

            var publicId = string.Join("/", url.Split("/")[^2..]);

            if (url.Contains("/images/"))
                resourceType = ResourceType.Image;
            else if (url.Contains("/videos/"))
                resourceType = ResourceType.Video;
            else
                resourceType = ResourceType.Raw;
            publicId = publicId.Contains(".bak") ? publicId : $"{publicId}.bak";
            var a = await cloudinary.DestroyAsync(new DeletionParams(publicId) { ResourceType = resourceType });
            int b = 1;
        }


        private T CreateUploadParams<T>(IFormFile file, string name)
            where T : RawUploadParams
        {
            Stream stream = file.OpenReadStream();
            var uploadParams = (T)Activator.CreateInstance(typeof(T));
            uploadParams.File = new FileDescription(name, stream);
            uploadParams.PublicId = name;
            uploadParams.Overwrite = true;
            return uploadParams;
        }
    }
}
