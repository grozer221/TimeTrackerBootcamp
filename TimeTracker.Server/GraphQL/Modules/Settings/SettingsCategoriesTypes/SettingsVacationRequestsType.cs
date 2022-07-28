using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsCategoriesTypes
{
    public class SettingsVacationRequestsType : ObjectGraphType<SettingsVacationRequests>
    {
        public SettingsVacationRequestsType()
        {
            Field<IntGraphType, int>()
               .Name("AmountDaysPerYear")
               .Resolve(context => context.Source.AmountDaysPerYear);
        }
    }
}
