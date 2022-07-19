using FluentMigrator;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202207192210)]
    public class _202207192210_ExpandedSettingsStringsLenght : Migration
    {
        public override void Up()
        {
            //Delete.UniqueConstraint("DF_Settings_CommonString");

            //Delete.Index("DF_Settings_ApplicationString")
            //    .OnTable("Settings")
            //    .OnColumn("ApplicationString");

            //Delete.Index("DF_Settings_TasksString")
            //    .OnTable("Settings")
            //    .OnColumn("TasksString");

            Alter.Table("Settings")
                .AlterColumn("EmploymentString").AsCustom("nvarchar(4000)").NotNullable().WithDefaultValue("{}")
                .AlterColumn("ApplicationString").AsCustom("nvarchar(4000)").NotNullable().WithDefaultValue("{}")
                .AlterColumn("TasksString").AsCustom("nvarchar(4000)").NotNullable().WithDefaultValue("{}");

            //Create.Index("DF_Settings_EmploymentString")
            //    .OnTable("Settings")
            //    .OnColumn("EmploymentString");

            //Create.Index("DF_Settings_ApplicationString")
            //    .OnTable("Settings")
            //    .OnColumn("ApplicationString");

            //Create.Index("DF_Settings_TasksString")
            //    .OnTable("Settings")
            //    .OnColumn("TasksString");
        }

        public override void Down()
        {
        }
    }
}
