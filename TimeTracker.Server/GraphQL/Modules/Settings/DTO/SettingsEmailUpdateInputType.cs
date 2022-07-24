using GraphQL.Types;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsEmailUpdateInput : IModelable<SettingsEmail>
    {
        public string Name { get; set; }
        public string Address { get; set; }

        public SettingsEmail ToModel()
        {
            return new SettingsEmail
            {
                Name = this.Name,
                Address = this.Address,
            };
        }
    }

    public class SettingsEmailUpdateInputType : InputObjectGraphType<SettingsEmailUpdateInput>
    {
        public SettingsEmailUpdateInputType()
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
