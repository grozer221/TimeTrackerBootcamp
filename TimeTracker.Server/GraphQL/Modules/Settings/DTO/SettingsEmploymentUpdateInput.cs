using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsEmploymentUpdateInput : IModelable<SettingsEmployment>
    {
        public int FullTimeHoursInWorkday { get; set; }
        public IEnumerable<int> PartTimeHoursInWorkday { get; set; }

        public SettingsEmployment ToModel()
        {
            return new SettingsEmployment
            {
                FullTimeHoursInWorkday = this.FullTimeHoursInWorkday,
                PartTimeHoursInWorkday = this.PartTimeHoursInWorkday,
            };
        }
    }

    public class SettingsEmploymentUpdateInputType : InputObjectGraphType<SettingsEmploymentUpdateInput>
    {
        public SettingsEmploymentUpdateInputType()
        {
            Field<NonNullGraphType<IntGraphType>, int>()
                 .Name("FullTimeHoursInWorkday")
                 .Resolve(context => context.Source.FullTimeHoursInWorkday);
            
            Field<NonNullGraphType<ListGraphType<IntGraphType>>, IEnumerable<int>>()
                 .Name("PartTimeHoursInWorkday")
                 .Resolve(context => context.Source.PartTimeHoursInWorkday);
        }
    }
}
