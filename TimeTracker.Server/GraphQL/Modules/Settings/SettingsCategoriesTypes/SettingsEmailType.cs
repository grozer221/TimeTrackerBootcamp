using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsCategoriesTypes
{
    public class SettingsEmailType : ObjectGraphType<SettingsEmail>
    {
        public SettingsEmailType()
        {
            Field<StringGraphType, string>()
               .Name("Name")
               .Resolve(context => context.Source.Name);
            
            Field<StringGraphType, string>()
               .Name("Address")
               .Resolve(context => context.Source.Address);
        }
    }
}
