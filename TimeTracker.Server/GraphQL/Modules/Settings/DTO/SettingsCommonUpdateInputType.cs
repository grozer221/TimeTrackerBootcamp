using GraphQL.Types;
using TimeTracker.Business.Models.Settings;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsCommonUpdateInput : IModelable<SettingsCommon>
    {
        public int FullTimeHoursInWorkday { get; set; }

        public SettingsCommon ToModel()
        {
            return new SettingsCommon
            {
                FullTimeHoursInWorkday = this.FullTimeHoursInWorkday,
            };
        }
    }

    public class SettingsCommonUpdateInputType : InputObjectGraphType<SettingsCommonUpdateInput>
    {
        public SettingsCommonUpdateInputType()
        {
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("FullTimeHoursInWorkday")
                 .Resolve(context => context.Source.FullTimeHoursInWorkday);
        }
    }
}
