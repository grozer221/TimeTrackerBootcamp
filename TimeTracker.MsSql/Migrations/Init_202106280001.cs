using FluentMigrator;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202207011320)]
    public class Init_202207011320 : Migration
    {
        public override void Up()
        {
            Create.Table("Users")
                .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
                .WithColumn("Email").AsString(50).NotNullable()
                .WithColumn("Password").AsString(60).NotNullable()
                .WithColumn("RatePerHour").AsDecimal().NotNullable();
        }

        public override void Down()
        {
            Delete.Table("Users");
        }
    }
}
