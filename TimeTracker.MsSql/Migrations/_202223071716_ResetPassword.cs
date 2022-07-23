using FluentMigrator;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202223071716)]
    public class _202223071716_ResetPassword : Migration
    {
        public override void Up()
        {
            Create.Table("ResetTokens")
                .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
                .WithColumn("Token").AsString(300).NotNullable().Unique()
                .WithColumn("UserId").AsGuid().NotNullable().ForeignKey("Users", "Id").OnDeleteOrUpdate(System.Data.Rule.Cascade)
                .WithColumn("CreatedAt").AsDateTime().NotNullable()
                .WithColumn("UpdatedAt").AsDateTime().NotNullable();
        }

        public override void Down()
        {
            Delete.Table("ResetTokens");
        }
    }
}
