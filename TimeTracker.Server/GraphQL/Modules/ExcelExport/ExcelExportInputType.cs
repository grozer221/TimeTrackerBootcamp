using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.ExcelExport
{
    public class ExcelExportInput
    {
        public string Like { get; set; } = "";
        public DateTime Date { get; set; }
    }

    public class ExcelExportInputType : InputObjectGraphType<ExcelExportInput>
    {
        public ExcelExportInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
               .Name("Like")
               .Resolve(context => context.Source.Like);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime>()
               .Name("Date")
               .Resolve(context => context.Source.Date);
        }
    }
}
