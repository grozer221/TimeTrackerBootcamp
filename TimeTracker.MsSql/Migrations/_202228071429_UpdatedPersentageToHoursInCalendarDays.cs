using FluentMigrator;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202228071429)]
    public class _202228071429_UpdatedPersentageToHoursInCalendarDays : Migration
    {
        public override void Up()
        {
            Rename.Column("PercentageWorkHours").OnTable("CalendarDays").To("WorkHours");
        }

        public override void Down()
        {
        }
    }
}
