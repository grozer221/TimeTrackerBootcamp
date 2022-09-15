using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeTracker.MsSql.Migrations
{
    [Migration(202209142144)]
    public class _202209142144_AddedMessages : Migration
    {
        public override void Up()
        {
            Create.Table("Messages")
                .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
                .WithColumn("UserIdTo").AsGuid().NotNullable().ForeignKey("Users", "Id")
                .WithColumn("UserIdFrom").AsGuid().NotNullable().ForeignKey("Users", "Id")
                .WithColumn("Message").AsString(300).NotNullable()
                .WithColumn("IsRead").AsBoolean().NotNullable()
                .WithColumn("CreatedAt").AsDateTime()
                .WithColumn("UpdatedAt").AsDateTime();
        }

        public override void Down()
        {
            Delete.Table("Messages");
        }
    }
}
