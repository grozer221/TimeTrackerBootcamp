using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Models.Filters;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;
using TimeTracker.Server.GraphQL.Modules.Users.DTO;

namespace TimeTracker.Server.GraphQL.Modules.ExcelExport
{
    public class ExcelExportInput
    {
        public UserFilter Filter { get; set; }
        public DateTime Date { get; set; }
    }

    public class ExcelExportInputType : InputObjectGraphType<ExcelExportInput>
    {
        public ExcelExportInputType()
        {
            Field<NonNullGraphType<UserFilterType>, UserFilter>()
               .Name("Filter")
               .Resolve(context => context.Source.Filter);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime>()
               .Name("Date")
               .Resolve(context => context.Source.Date);
        }
    }
}
