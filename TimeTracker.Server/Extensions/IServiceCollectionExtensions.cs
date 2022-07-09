using GraphQL;
using GraphQL.Server;
using GraphQL.Server.Transports.AspNetCore;
using GraphQL.SystemTextJson;
using GraphQL.Types;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using TimeTracker.Business.Enums;
using TimeTracker.Server.GraphQL;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.Services;

namespace TimeTracker.Server.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddGraphQLApi(this IServiceCollection services)
        {
            services.AddMemoryCache();
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
                .AddScheme<BasicAuthenticationOptions, BasicAuthenticationHandler>(BasicAuthenticationHandler.SchemeName, options => { });
            return services;
        }

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddSingleton<AuthService>();
            return services;
        }
    }
}
