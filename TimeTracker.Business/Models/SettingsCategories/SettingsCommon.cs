namespace TimeTracker.Business.Models.SettingsCategories
{
    public class SettingsEmployment
    {
        public int FullTimeHoursInWorkday { get; set; }
        public IEnumerable<int> PartTimeHoursInWorkday { get; set; } = new List<int>();
    }
}
