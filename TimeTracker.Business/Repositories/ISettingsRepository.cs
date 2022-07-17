using TimeTracker.Business.Models;
using TimeTracker.Business.Models.Settings;

namespace TimeTracker.Business.Repositories
{
    public interface ISettingsRepository
    {
        Task<SettingsModel> GetAsync();
        Task<SettingsModel> UpdateCommonAsync(SettingsCommon settingsCommon);
    }
}
