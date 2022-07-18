using FluentValidation;

namespace TimeTracker.Server.GraphQL.Modules.Settings.DTO
{
    public class SettingsEmploymentUpdateInputValidator : AbstractValidator<SettingsEmploymentUpdateInput>
    {
        public SettingsEmploymentUpdateInputValidator()
        {
            RuleFor(l => l.FullTimeHoursInWorkday)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(24);

            RuleFor(l => l.PartTimeHoursInWorkday)
                .NotNull()
                .Must(partTimeHoursInWorkday =>
                {
                    return partTimeHoursInWorkday.Count() == partTimeHoursInWorkday.Distinct().Count();
                })
                .WithMessage("PartTime hours in workday can not duplicate")
                .Must(partTimeHoursInWorkday =>
                {
                    bool isError = false;
                    foreach (var hour in partTimeHoursInWorkday)
                    {
                        if (hour < 0 || hour > 24)
                        {
                            isError = true;
                            break;
                        }
                    }
                    return !isError;
                })
                .WithMessage("PartTime hours in workday must be in range 0-24");
     
        }
    }
}
