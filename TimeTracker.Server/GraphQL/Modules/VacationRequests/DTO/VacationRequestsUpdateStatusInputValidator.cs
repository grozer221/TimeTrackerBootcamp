using FluentValidation;
using TimeTracker.Business.Repositories;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsUpdateStatusInputValidator : AbstractValidator<VacationRequestsUpdateStatusInput>
    {
        public VacationRequestsUpdateStatusInputValidator(IVacationRequestRepository vacationRequestRepository)
        {
            RuleFor(l => l.Id)
                .NotNull()
                .MustAsync(async (id, _) =>
                {
                    var vacationRequest = await vacationRequestRepository.GetByIdAsync(id);
                    return vacationRequest != null;
                }).WithMessage("Vacation request with current id does not exsits");

            RuleFor(l => l.Status)
                .NotNull();
        }
    }
}
