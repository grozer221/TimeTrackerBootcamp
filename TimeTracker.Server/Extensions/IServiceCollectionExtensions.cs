using FluentValidation;
using GraphQL;
using GraphQL.Server;
using GraphQL.SystemTextJson;
using Quartz;
using System.Reflection;
using System.Security.Claims;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Server.Abstractions;
using TimeTracker.Server.GraphQL;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.Middlewares;
using TimeTracker.Server.Services;
using TimeTracker.Server.Tasks;

namespace TimeTracker.Server.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddGraphQLApi(this IServiceCollection services)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly(), ServiceLifetime.Transient);
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();

            services.AddTransient<AppSchema>();
            services.AddGraphQLUpload();
            services
                .AddGraphQL(options =>
                {
                    options.EnableMetrics = true;
                    options.UnhandledExceptionDelegate = (context) =>
                    {
                        Console.WriteLine(context.Exception.StackTrace);
                        context.ErrorMessage = context.Exception.Message;
                    };
                })
                .AddSystemTextJson()
                .AddGraphTypes(typeof(AppSchema), ServiceLifetime.Transient)
                .AddGraphQLAuthorization(options =>
                {
                    options.AddPolicy(AuthPolicies.Authenticated, p => p.RequireAuthenticatedUser());
                    options.AddPolicy(AuthPolicies.Employee, p => p.RequireClaim(ClaimTypes.Role, Role.Employee.ToString(), Role.Administrator.ToString()));
                    options.AddPolicy(AuthPolicies.Administrator, p => p.RequireClaim(ClaimTypes.Role, Role.Administrator.ToString()));
                });

            return services;
        }

        public static IServiceCollection AddJwtAuthorization(this IServiceCollection services)
        {
            services
                .AddAuthentication(BasicAuthenticationHandler.SchemeName)
                .AddScheme<BasicAuthenticationOptions, BasicAuthenticationHandler>(BasicAuthenticationHandler.SchemeName, _ => { });
            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddSingleton<IAuthService, AuthService>();
            services.AddSingleton<FileManagerService>();
            return services;
        }

        public static IServiceCollection AddTasks(this IServiceCollection services)
        {
            services.AddHostedService<TasksService>();
            services.AddScoped<AutoCreateDaysOffTask>();
            services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
            services.AddQuartz(q =>
            {
                q.UseMicrosoftDependencyInjectionScopedJobFactory();
                q.AddJob<AutoCreateDaysOffTask>(configure => configure.WithIdentity(AutoCreateDaysOffTask.JobKey));
                var autoCreateDaysOffTask = services.BuildServiceProvider().GetRequiredService<AutoCreateDaysOffTask>();
                q.AddTrigger(configure => autoCreateDaysOffTask.ConfigureTriggerConfiguratorAsync(configure).GetAwaiter().GetResult());
            });
            return services;
        }
    }
}
