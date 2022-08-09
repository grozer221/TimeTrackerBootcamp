using GraphQL;
using GraphQL.Types;
using Microsoft.Net.Http.Headers;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.Services;

namespace TimeTracker.Server.GraphQL.Modules.ExcelExport
{
    public class ExcelExportQueries : ObjectGraphType
    {
        public ExcelExportQueries(IExcelExportRepository excelExportRepository, CalendarDaysService calendarService)
        {
            Field<ListGraphType<ByteGraphType>, byte[]>()
                .Name("CreateReport")
                .Argument<NonNullGraphType<ExcelExportInputType>, ExcelExportInput>("ExcelExportInputType", "Argument for create excel report")
                .ResolveAsync(async context =>
                {
                    List<ExcelModel> models = new List<ExcelModel>();
                    var excelExportInputType = context.GetArgument<ExcelExportInput>("ExcelExportInputType");
                    var users = await excelExportRepository.GetAsync(excelExportInputType.Filter, excelExportInputType.Date);
                    
                    foreach (var user in users)
                    {
                        var model = user.ToExcelModel();
                        model.WorkerHours = await excelExportRepository.GetUserHours(user.Id, excelExportInputType.Date);
                        model.MonthHours = await calendarService.GetAmountWorkingHoursInMonth(excelExportInputType.Date);
                        model.PersentOfWork = model.WorkerHours / model.MonthHours;
                        models.Add(model);
                    }

                    return await ExcelService.CreateReport(excelExportInputType.Date, models);
                }).AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
