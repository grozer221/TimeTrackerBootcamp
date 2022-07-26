using TimeTracker.Business.Repositories;
using TimeTracker.Server.Extensions;

namespace TimeTracker.Server.Services
{
    public class VacationRequestsService
    {
        public const int VacationDaysPerYear = 30;

        private readonly IUserRepository userRepository;
        private readonly IVacationRequestRepository vacationRequestRepository;

        public VacationRequestsService(IUserRepository userRepository, IVacationRequestRepository vacationRequestRepository)
        {
            this.userRepository = userRepository;
            this.vacationRequestRepository = vacationRequestRepository;
        }

        public async Task<int> GetAvaliableDaysAsync(Guid currentUserId)
        {
            var currentUser = await userRepository.GetByIdAsync(currentUserId);
            var dateOfEmployment = currentUser.CreatedAt;
            var dateNow = DateTime.Now;
            var employedYears = new DateTime((dateNow - dateOfEmployment).Ticks).Year - 1;
            if (employedYears < 1)
                return 0;

            var dateOfEmploymentPlusEmployedYears = dateOfEmployment.AddYears(employedYears);
            var currentYearVacationRequests = await vacationRequestRepository.GetAsync(currentUserId, dateOfEmploymentPlusEmployedYears, dateNow);
            var currentYearUsedVacationDays = 0;
            foreach (var currentYearVacationRequest in currentYearVacationRequests)
                currentYearUsedVacationDays += (int)(currentYearVacationRequest.DateEnd - currentYearVacationRequest.DateStart).TotalDays;

            if (currentYearUsedVacationDays >= VacationDaysPerYear)
                return 0;

            return VacationDaysPerYear - currentYearUsedVacationDays;
        }
    }
}
