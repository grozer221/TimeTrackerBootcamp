using Microsoft.Extensions.Caching.Memory;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Business.Models.Settings;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Caching.Managers
{
    public class SettingsManager : ISettingsManager
    {
        public const string GetAsyncKey = "GetAsyncKey";
        private readonly IMemoryCache memoryCache;
        private readonly ISettingsRepository settingsRepository;

        public SettingsManager(IMemoryCache memoryCache, ISettingsRepository settingsRepository)
        {
            this.memoryCache = memoryCache;
            this.settingsRepository = settingsRepository;
        }

        public async Task<SettingsModel> GetAsync()
        {
            SettingsModel settings;
            if (!memoryCache.TryGetValue(GetAsyncKey, out settings))
            {
                settings = await settingsRepository.GetAsync();
                memoryCache.Set(GetAsyncKey, settings, CachingContext.MemoryCacheEntryOptionsWeek1);
            }
            return settings;
        }

        public async Task<SettingsModel> UpdateCommonAsync(SettingsCommon settingsCommon)
        {
            memoryCache.Remove(GetAsyncKey);
            return await settingsRepository.UpdateCommonAsync(settingsCommon);
        }
    }
}
