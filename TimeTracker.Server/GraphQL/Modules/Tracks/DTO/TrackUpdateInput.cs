namespace TimeTracker.Server.GraphQL.Modules.Tracks.DTO
{
    public class TrackUpdateInput
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
