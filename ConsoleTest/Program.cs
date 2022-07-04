// See https://aka.ms/new-console-template for more information

using TimeTracker.Business.Models;
using TimeTracker.MsSql;
using TimeTracker.MsSql.Repositories;

Console.WriteLine("Start");


TrackRepository repository = new TrackRepository(new DapperContext());

TrackModel model = new TrackModel
{
    Id = Guid.NewGuid(),
    Title = "Test",
    UserId = Guid.NewGuid(),
    Description = "Description"
};

await repository.CreateAsync(model);

var query = await repository.GetAsync("", 1, 1);


foreach(var line in query)
{
    Console.WriteLine(line.Title);
}


