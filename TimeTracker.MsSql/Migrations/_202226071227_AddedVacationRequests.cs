using FluentMigrator;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202226071227)]
    public class _202226071227_AddedVacationRequests : Migration
    {
        public override void Up()
        {
            Create.Table("VacationRequests")
               .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
               .WithColumn("DateStart").AsDate().NotNullable()
               .WithColumn("DateEnd").AsDate().NotNullable()
               .WithColumn("Comment").AsString().Nullable()
               .WithColumn("Status").AsInt32().Nullable()
               .WithColumn("UserId").AsGuid().NotNullable().ForeignKey("Users", "Id")
               .WithColumn("CreatedAt").AsDateTime().NotNullable()
               .WithColumn("UpdatedAt").AsDateTime().NotNullable();
        }

        public override void Down()
        {
        }
    }
}
