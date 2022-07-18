using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsApplicationUpdateInput : IModelable<SettingsApplication>
    {
        public string Title { get; set; }
        public string FaviconUrl { get; set; }
        public string LogoUrl { get; set; }

        public SettingsApplication ToModel()
        {
            return new SettingsApplication
            {
                Title = this.Title,
                FaviconUrl = this.FaviconUrl,
                LogoUrl = this.LogoUrl,
            };
        }
    }

    public class SettingsApplicationUpdateInputType : InputObjectGraphType<SettingsApplicationUpdateInput>
    {
        public SettingsApplicationUpdateInputType()
        {
            Field<StringGraphType, string>()
                 .Name("Title")
                 .Resolve(context => context.Source.Title);
            
            Field<StringGraphType, string>()
                 .Name("FaviconUrl")
                 .Resolve(context => context.Source.FaviconUrl);
            
            Field<StringGraphType, string>()
                 .Name("LogoUrl")
                 .Resolve(context => context.Source.LogoUrl);
        }
    }
}
