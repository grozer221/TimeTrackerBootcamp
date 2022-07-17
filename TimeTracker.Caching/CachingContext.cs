using Microsoft.Extensions.Caching.Memory;

namespace TimeTracker.Caching
{
    public class CachingContext
    {
        public static MemoryCacheEntryOptions MemoryCacheEntryOptionsHours1
        {
            get => new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromHours(1));
        }
        public static MemoryCacheEntryOptions MemoryCacheEntryOptionsHours24
        {
            get => new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromHours(24));
        }
        
        public static MemoryCacheEntryOptions MemoryCacheEntryOptionsWeek1
        {
            get => new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromDays(7));
        }
    }
}
