using TimeTracker.Business.Repositories;
using TimeTracker.MsSql.Extensions;
using TimeTracker.MsSql.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", builder =>
    {
        builder.AllowAnyHeader()
               .WithMethods("POST")
               .WithOrigins("http://localhost:3000")
               .AllowCredentials();
    });
});

builder.Services.AddServices();
builder.Services.AddGraphQLApi();
builder.Services.AddJwtAuthorization();
builder.Services.AddMsSql();



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

app.Run();
