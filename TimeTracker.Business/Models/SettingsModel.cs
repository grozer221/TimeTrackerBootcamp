using Newtonsoft.Json;
using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Models.Settings;

namespace TimeTracker.Business.Models
{
    public class SettingsModel : BaseModel
    {
        public string CommonString { get; private set; }
        public SettingsCommon Common
        {
            get => JsonConvert.DeserializeObject<SettingsCommon>(CommonString) ?? new SettingsCommon();
            set => CommonString = JsonConvert.SerializeObject(value);
        }
    }
}
