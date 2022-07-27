using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using TimeTracker.Business.Models;

namespace TimeTracker.Server.Services
{
    public class ExcelService
    {
        public async void CreateReport(string month, IEnumerable<ExcelModel> models)
        {
            using var packege = new ExcelPackage(new FileInfo(@"C:\Users\lutsk\Desktop\Excel\Report.xlsx"));

            var ws = packege.Workbook.Worksheets.Add($"{month}Report");
            ws.Cells["A1"].Value = $"{month} Work Hours Report";
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
            
            await packege.SaveAsync();
        }
        
    }
}
