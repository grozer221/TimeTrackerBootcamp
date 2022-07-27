using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsVacationRequestsUpdateInput : IModelable<SettingsVacationRequests>
    {
        public int AmountDaysPerYear { get; set; }

        public SettingsVacationRequests ToModel()
        {
            return new SettingsVacationRequests
            {
                AmountDaysPerYear = this.AmountDaysPerYear,
            };
        }
    }

    public class SettingsVacationRequestsUpdateInputType : InputObjectGraphType<SettingsVacationRequestsUpdateInput>
    {
        public SettingsVacationRequestsUpdateInputType()
        {
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("AmountDaysPerYear")
                 .Resolve(context => context.Source.AmountDaysPerYear);
        }
    }
}
