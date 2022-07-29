using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeTracker.MsSql.Migrations
{
    public class _202207291453_AddTrackType : Migration
    {
        public override void Up()
        {
            Alter.Table("Tracks")
                .AddColumn("Type").AsInt32().NotNullable();
        }

        public override void Down()
        {
        }
    }
}
