using GraphQL.Types;
using TimeTracker.Business.Models.Settings;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsCommonUpdateInput : IModelable<SettingsCommon>
    {
        public int HoursInWorkday { get; set; }

        public SettingsCommon ToModel()
        {
            return new SettingsCommon
            {
                HoursInWorkday = this.HoursInWorkday,
            };
        }
    }

    public class SettingsCommonUpdateInputType : InputObjectGraphType<SettingsCommonUpdateInput>
    {
        public SettingsCommonUpdateInputType()
        {
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("HoursInWorkday")
                 .Resolve(context => context.Source.HoursInWorkday);
        }
    }
}
