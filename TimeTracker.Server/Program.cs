using TimeTracker.Caching.Extensions;
using TimeTracker.MsSql.Extensions;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL;
using TimeTracker.Server.SignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", builder =>
    {
        builder.AllowAnyHeader()
               .WithOrigins("http://localhost:3000")
               .AllowCredentials()
               .AllowAnyMethod();
    });
});

builder.Services.AddServices();
builder.Services.AddGraphQLApi();
builder.Services.AddJwtAuthorization();
builder.Services.AddMsSql();
builder.Services.AddCaching();
builder.Services.AddTasks();
builder.Services.AddSignalR(options => options.EnableDetailedErrors = true);

var app = builder.Build();

if (app.Environment.IsDevelopment()) 
{ 
    app.UseCors("DefaultPolicy");
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseGraphQLUpload<AppSchema>()
    .UseGraphQL<AppSchema>();
app.UseGraphQLAltair();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "wwwroot";
});

app.MapHub<ChatHub>("/chathub");

app.Run();
