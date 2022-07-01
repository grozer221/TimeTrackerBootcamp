using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace TimeTracker.MsSql.Services
{
    public class DatabaseService : IHostedService
    {
        private readonly IServiceProvider serviceProvider;

        public DatabaseService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var migrationRunner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
                migrationRunner.MigrateUp();
                return Task.CompletedTask;
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
