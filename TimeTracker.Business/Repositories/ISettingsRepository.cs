using TimeTracker.Business.Models;
using TimeTracker.Business.Models.SettingsCategories;
using TimeTracker.Business.Models.SettingsCategories.SettingsTasksCategories;

namespace TimeTracker.Business.Repositories
{
    public interface ISettingsRepository
    {
        Task<SettingsModel> GetAsync();
        Task<SettingsModel> UpdateEmploymentAsync(SettingsEmployment settingsEmployment);
        Task<SettingsModel> UpdateApplicationAsync(SettingsApplication settingsApplication);
        Task<SettingsModel> UpdateTasksAsync(SettingsTasks settingsTasks);
    }
}
