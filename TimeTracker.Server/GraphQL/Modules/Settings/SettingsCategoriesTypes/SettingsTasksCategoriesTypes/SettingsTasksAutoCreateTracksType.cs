using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;

namespace TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes.SettingsTasksCategoriesTypes
{
    public class SettingsTasksAutoCreateTracksType : ObjectGraphType<SettingsTasksAutoCreateTracks>
    {
        public SettingsTasksAutoCreateTracksType()
        {
            Field<BooleanGraphType, bool>()
               .Name("IsEnabled")
               .Resolve(context => context.Source.IsEnabled);
            
            Field<DateTimeGraphType, DateTime>()
               .Name("TimeWhenCreate")
               .Resolve(context => context.Source.TimeWhenCreate);
        }
    }
}
