using FluentMigrator;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202223071948)]
    public class _202223071948_UpdatedTablesNamesWithTokens : Migration
    {
        public override void Up()
        {
            Rename.Table("ResetTokens").To("ResetPassTokens");
            Rename.Table("Tokens").To("AccessTokens");
        }

        public override void Down()
        {
        }
    }
}
