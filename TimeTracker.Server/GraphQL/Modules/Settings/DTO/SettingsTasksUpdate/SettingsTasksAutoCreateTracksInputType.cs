using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsTasksUpdate
{
    public class SettingsTasksAutoCreateTracksInput : IModelable<SettingsTasksAutoCreateTracks>
    {
        public bool IsEnabled { get; set; }
        public TimeOnly TimeWhenCreate { get; set; }

        public SettingsTasksAutoCreateTracks ToModel()
        {
            var timeWhenCreateDateTime = new DateTime();
            timeWhenCreateDateTime += TimeWhenCreate.ToTimeSpan();
            return new SettingsTasksAutoCreateTracks
            {
                IsEnabled = this.IsEnabled,
                TimeWhenCreate = timeWhenCreateDateTime,
            };
        }
    }

    public class SettingsTasksAutoCreateTracksInputType : InputObjectGraphType<SettingsTasksAutoCreateTracksInput>
    {
        public SettingsTasksAutoCreateTracksInputType()
        {
            Field<NonNullGraphType<BooleanGraphType>, bool>()
                .Name("IsEnabled")
                .Resolve(context => context.Source.IsEnabled);

            Field<TimeOnlyGraphType, TimeOnly>()
                .Name("TimeWhenCreate")
                .Resolve(context => context.Source.TimeWhenCreate);
        }
    }
}
