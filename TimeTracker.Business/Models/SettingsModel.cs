using Newtonsoft.Json;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models.SettingsCategories;

namespace TimeTracker.Business.Models
{
    public class SettingsModel : BaseModel
    {
        public string EmploymentString { get; private set; }
        public SettingsEmployment Employment
        {
            get => JsonConvert.DeserializeObject<SettingsEmployment>(EmploymentString) ?? new SettingsEmployment();
            set => EmploymentString = JsonConvert.SerializeObject(value);
        }
        
        public string ApplicationString { get; private set; }
        public SettingsApplication Application
        {
            get => JsonConvert.DeserializeObject<SettingsApplication>(ApplicationString) ?? new SettingsApplication();
            set => ApplicationString = JsonConvert.SerializeObject(value);
        }
        
        public string TasksString { get; private set; }
        public SettingsTasks Tasks
        {
            get => JsonConvert.DeserializeObject<SettingsTasks>(TasksString) ?? new SettingsTasks();
            set => TasksString = JsonConvert.SerializeObject(value);
        }
    }
}
