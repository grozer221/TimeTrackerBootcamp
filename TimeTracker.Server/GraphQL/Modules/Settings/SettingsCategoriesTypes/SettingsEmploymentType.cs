using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;

namespace TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes
{
    public class SettingsEmploymentType : ObjectGraphType<SettingsEmployment>
    {
        public SettingsEmploymentType()
        {
            Field<TimeOnlyGraphType, TimeOnly>()
               .Name("WorkdayStartAt")
               .Resolve(context => TimeOnly.FromDateTime(context.Source.WorkdayStartAt));

            Field<NonNullGraphType<IntGraphType>, int>()
               .Name("HoursInWorkday")
               .Resolve(context => context.Source.HoursInWorkday);
        }
    }
}
