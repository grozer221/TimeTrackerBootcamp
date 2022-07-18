using Microsoft.Extensions.DependencyInjection;
using TimeTracker.Business.Abstraction;
using TimeTracker.Business.Managers;
using TimeTracker.Caching.Managers;

namespace TimeTracker.Caching.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddCaching(this IServiceCollection services)
        {
            services.AddMemoryCache();

            services.AddScoped<IManager, SettingsManager>();
            services.AddScoped<ISettingsManager, SettingsManager>();

            services.AddScoped<IManager, CalendarDayManager>();
            services.AddScoped<ICalendarDayManager, CalendarDayManager>();
            return services;
        }
    }
}
