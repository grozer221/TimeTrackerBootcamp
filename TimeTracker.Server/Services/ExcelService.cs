using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using System.Globalization;
using TimeTracker.Business.Models;

namespace TimeTracker.Server.Services
{
    public static class ExcelService
    {
        public static async Task<byte[]> CreateReport(DateTime date, IEnumerable<ExcelModel> models)
        {
            using var package = new ExcelPackage();

            var culture = new CultureInfo("en-US");
            CultureInfo.CurrentCulture = culture;

            var ws = package.Workbook.Worksheets.Add($"{date.ToString("yyyy MMMM")}Report");
            ws.Cells["A1"].Value = $"{date.ToString("yyyy MMMM")} Work Hours Report";
            ws.Cells["A1:G1"].Merge = true;
            ws.Column(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            ws.Row(1).Style.Font.Size = 24;
            ws.Row(1).Style.Font.Color.SetColor(Color.Blue);
            ws.Row(2).Style.Font.Bold = true;

            var range = ws.Cells["A2"].LoadFromCollection(models, PrintHeaders: true);

            range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            range.AutoFitColumns();
            range.Style.Numberformat.Format = "0";
            range.Style.Border.BorderAround(ExcelBorderStyle.Medium);

            for (int i = 0; i < models.Count(); i++)
            {
                ws.Cells[$"E{i+3}"].Formula = $"C{i+3}/D{i+3}";
                ws.Cells[$"E{i+3}"].Style.Numberformat.Format = "0%";
                ws.Cells[$"C{i+3}"].Style.Numberformat.Format = "0.0";
            }

            return await package.GetAsByteArrayAsync();
        }
        
    }
}
