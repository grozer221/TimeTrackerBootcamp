using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;

namespace TimeTracker.Server.GraphQL.Modules.Settings.SettingsCategoriesTypes
{
    public class SettingsApplicationType : ObjectGraphType<SettingsApplication>
    {
        public SettingsApplicationType()
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
