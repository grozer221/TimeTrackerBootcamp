using FluentMigrator;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202207021636)]
    public class _202207021636_UpdatedUser : Migration
    {
        public override void Up()
        {
            Alter.Table("Users")
                .AddColumn("FirstName").AsString(50).NotNullable()
                .AddColumn("LastName").AsString(50).NotNullable()
                .AddColumn("MiddleName").AsString(50).NotNullable()
                .AddColumn("DateBirth").AsDateTime()
                .AddColumn("Role").AsString(50);

        }

        public override void Down()
        {
        }
    }
}
