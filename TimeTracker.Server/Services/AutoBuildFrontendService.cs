using TimeTracker.Server.Abstractions;

namespace TimeTracker.Server.Services
{
    public class AutoBuildFrontendService : IHostedService
    {
        private readonly ICmdCommandService cmdCommandService;
        private readonly IWebHostEnvironment webHostEnvironment;

        public AutoBuildFrontendService(ICmdCommandService cmdCommandService, IWebHostEnvironment webHostEnvironment)
        {
            this.cmdCommandService = cmdCommandService;
            this.webHostEnvironment = webHostEnvironment;
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            var frontendPath = webHostEnvironment.ContentRootPath;
            for (int i = 0; i < 2; i++)
                frontendPath = Directory.GetParent(frontendPath).FullName;
            frontendPath = Path.Combine(frontendPath, "TimeTracker.WebClient");
            var command = "npm run build";
            cmdCommandService.Run(frontendPath, command);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
