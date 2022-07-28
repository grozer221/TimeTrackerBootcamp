using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsEmploymentUpdateInput : IModelable<SettingsEmployment>
    {
        public TimeOnly WorkdayStartAt { get; set; }
        public int HoursInWorkday { get; set; }

        public SettingsEmployment ToModel()
        {
            var workdayStartAtDateTime = new DateTime();
            workdayStartAtDateTime += WorkdayStartAt.ToTimeSpan();
            return new SettingsEmployment
            {
                WorkdayStartAt = workdayStartAtDateTime,
                HoursInWorkday = this.HoursInWorkday,
            };
        }
    }

    public class SettingsEmploymentUpdateInputType : InputObjectGraphType<SettingsEmploymentUpdateInput>
    {
        public SettingsEmploymentUpdateInputType()
        {
            Field<TimeOnlyGraphType, TimeOnly>()
                 .Name("WorkdayStartAt")
                 .Resolve(context => context.Source.WorkdayStartAt);

            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("HoursInWorkday")
                 .Resolve(context => context.Source.HoursInWorkday);
        }
    }
}
