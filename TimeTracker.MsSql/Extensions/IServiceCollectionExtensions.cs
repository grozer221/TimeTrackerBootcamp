using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TimeTracker.Business.Repositories;
using TimeTracker.MsSql.Repositories;
using TimeTracker.MsSql.Services;

namespace TimeTracker.MsSql.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddMsSql(this IServiceCollection services)
        {
            services.AddSingleton<DapperContext>();

            services.AddHostedService<DatabaseService>();
            services.AddSingleton<DatabaseService>();
            services.AddLogging(c => c.AddFluentMigratorConsole())
                .AddFluentMigratorCore()
                .ConfigureRunner(c => c.AddSqlServer2016()
                    .WithGlobalConnectionString(DapperContext.ConnectionString)
                    .ScanIn(Assembly.GetExecutingAssembly()).For.Migrations());

            services.AddScoped<ICalendarDayRepository, CalendarDayRepository>();
            services.AddScoped<ISettingsRepository, SettingsRepository>();
            services.AddScoped<IAccessTokenRepository, AccessTokenRepository>();
            services.AddScoped<ITrackRepository, TrackRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IResetPassTokenRepository, ResetPassTokenRepository>();
            services.AddScoped<IUsers_UsersWhichCanApproveVocationRequestsRepository, Users_UsersWhichCanApproveVocationRequestsRepository>();
            services.AddScoped<IVacationRequestRepository, VacationRequestRepository>();
            return services;
        }
    }
}
