using TimeTracker.Business.Managers;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.Services
{
    public class VacationRequestsService
    {
        private readonly IUserRepository userRepository;
        private readonly IVacationRequestRepository vacationRequestRepository;
        private readonly ISettingsManager settingsManager;

        public VacationRequestsService(IUserRepository userRepository, IVacationRequestRepository vacationRequestRepository, ISettingsManager settingsManager)
        {
            this.userRepository = userRepository;
            this.vacationRequestRepository = vacationRequestRepository;
            this.settingsManager = settingsManager;
        }

        public async Task<int> GetAvaliableDaysAsync(Guid userId)
        {
            var currentUser = await userRepository.GetByIdAsync(userId);
            var dateOfEmployment = currentUser.CreatedAt;
            var dateNow = DateTime.Now;
            var employedYears = new DateTime((dateNow - dateOfEmployment).Ticks).Year - 1;
            if (employedYears < 1)
                return 0;

            var dateOfEmploymentPlusEmployedYears = dateOfEmployment.AddYears(employedYears);
            var currentYearVacationRequests = await vacationRequestRepository.GetAsync(userId, dateOfEmploymentPlusEmployedYears, dateNow);
            var currentYearUsedVacationDays = 0;
            foreach (var currentYearVacationRequest in currentYearVacationRequests)
                currentYearUsedVacationDays += (int)(currentYearVacationRequest.DateEnd - currentYearVacationRequest.DateStart).TotalDays;

            var settings = await settingsManager.GetAsync();
            var vacationDaysPerYear = settings.VacationRequests.AmountDaysPerYear;
            if (currentYearUsedVacationDays >= vacationDaysPerYear)
                return 0;

            return vacationDaysPerYear - currentYearUsedVacationDays;
        }
    }
}
