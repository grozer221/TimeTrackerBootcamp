using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsTasksUpdate
{
    public class SettingsTasksUpdateInput : IModelable<SettingsTasks>
    {
        public SettingsTasksAutoCreateTracksInput AutoCreateTracks { get; set; }
        public SettingsTasksAutoCreateDaysOffInput AutoCreateDaysOff { get; set; }

        public SettingsTasks ToModel()
        {
            return new SettingsTasks
            {
                AutoCreateTracks = this.AutoCreateTracks.ToModel(),
                AutoCreateDaysOff = this.AutoCreateDaysOff.ToModel(),
            };
        }
    }

    public class SettingsTasksUpdateInputType : InputObjectGraphType<SettingsTasksUpdateInput>
    {
        public SettingsTasksUpdateInputType()
        {
            Field<SettingsTasksAutoCreateTracksInputType, SettingsTasksAutoCreateTracksInput>()
                 .Name("AutoCreateTracks")
                 .Resolve(context => context.Source.AutoCreateTracks);
            
            Field<SettingsTasksAutoCreateDaysOffInputType, SettingsTasksAutoCreateDaysOffInput>()
                 .Name("AutoCreateDaysOff")
                 .Resolve(context => context.Source.AutoCreateDaysOff);
        }
    }
}
