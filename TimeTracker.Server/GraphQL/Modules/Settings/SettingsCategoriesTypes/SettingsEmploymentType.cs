using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;

namespace TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes
{
    public class SettingsEmploymentType : ObjectGraphType<SettingsEmployment>
    {
        public SettingsEmploymentType()
        {
            Field<IntGraphType, int>()
               .Name("FullTimeHoursInWorkday")
               .Resolve(context => context.Source.FullTimeHoursInWorkday);
            
            Field<ListGraphType<IntGraphType>, IEnumerable<int>>()
               .Name("PartTimeHoursInWorkday")
               .Resolve(context => context.Source.PartTimeHoursInWorkday);
        }
    }
}
