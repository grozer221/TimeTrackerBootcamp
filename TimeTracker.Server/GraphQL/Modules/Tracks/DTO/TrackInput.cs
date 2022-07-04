namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackInput
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
    }
}
