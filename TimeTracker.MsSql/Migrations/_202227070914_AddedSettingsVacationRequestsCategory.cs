using FluentMigrator;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202227070914)]
    public class _202227070914_AddedSettingsVacationRequestsCategory : Migration
    {
        public override void Up()
        {
            Alter.Table("Settings")
               .AddColumn("VacationRequestsString").AsCustom("nvarchar(4000)").NotNullable().WithDefaultValue("{}");
        }

        public override void Down()
        {
        }
    }
}
