using Microsoft.Extensions.DependencyInjection;
using TimeTracker.Business.Managers;
using TimeTracker.Caching.Managers;

namespace TimeTracker.Caching.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddCaching(this IServiceCollection services)
        {
            services.AddMemoryCache();
            services.AddScoped<ISettingsManager, SettingsManager>();
            return services;
        }
    }
}
