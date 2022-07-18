using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsTasksUpdateInput : IModelable<SettingsTasks>
    {
        public TimeOnly CalculateSalaryForFullTimer { get; set; }

        public SettingsTasks ToModel()
        {
            var calculateSalaryForFullTimerDateTime = new DateTime(2022, 1, 1);
            calculateSalaryForFullTimerDateTime += CalculateSalaryForFullTimer.ToTimeSpan();
            return new SettingsTasks
            {
                CalculateSalaryForFullTimer = calculateSalaryForFullTimerDateTime,
            };
        }
    }

    public class SettingsTasksUpdateInputType : InputObjectGraphType<SettingsTasksUpdateInput>
    {
        public SettingsTasksUpdateInputType()
        {
            Field<TimeOnlyGraphType, TimeOnly>()
                 .Name("CalculateSalaryForFullTimer")
                 .Resolve(context => context.Source.CalculateSalaryForFullTimer);
        }
    }
}
