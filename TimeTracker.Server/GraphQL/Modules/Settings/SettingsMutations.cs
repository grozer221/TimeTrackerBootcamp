using FluentValidation;
using GraphQL;
using GraphQL.Types;
using Quartz;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Managers;
using TimeTracker.Business.Models;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;
using TimeTracker.Server.GraphQL.Modules.Settings.DTO;
using TimeTracker.Server.GraphQL.Modules.Settings.DTO.SettingsTasksUpdate;
using TimeTracker.Server.Tasks;

namespace TimeTracker.Server.GraphQL.Modules.Settings
{
    public class SettingsMutations : ObjectGraphType
    {
        public SettingsMutations(
            ISettingsManager settingsManager,
            IHttpContextAccessor httpContextAccessor,
            IValidator<SettingsEmploymentUpdateInput> settingsCommonUpdateInputValidator,
            IValidator<SettingsApplicationUpdateInput> settingsApplicationUpdateInputValidator, 
            ISchedulerFactory schedulerFactory,
            AutoCreateDaysOffTask autoCreateDaysOffTask)
        {
            Field<NonNullGraphType<SettingsType>, SettingsModel>()
               .Name("UpdateEmployment")
               .Argument<NonNullGraphType<SettingsEmploymentUpdateInputType>, SettingsEmploymentUpdateInput>("SettingsEmploymentUpdateInputType", "Argument for update employment settings")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateSettings))
                       throw new ExecutionError("You do not have permissions for update employment settings");
                   var settingsEmploymentUpdateInputType = context.GetArgument<SettingsEmploymentUpdateInput>("SettingsEmploymentUpdateInputType");
                   settingsCommonUpdateInputValidator.ValidateAndThrow(settingsEmploymentUpdateInputType);
                   var settingsCommon = settingsEmploymentUpdateInputType.ToModel();
                   return await settingsManager.UpdateEmploymentAsync(settingsCommon);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
            
            Field<NonNullGraphType<SettingsType>, SettingsModel>()
               .Name("UpdateApplication")
               .Argument<NonNullGraphType<SettingsApplicationUpdateInputType>, SettingsApplicationUpdateInput>("SettingsApplicationUpdateInputType", "Argument for update application settings")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateSettings))
                       throw new ExecutionError("You do not have permissions for update application settings");
                   var settingsApplicationUpdateInput = context.GetArgument<SettingsApplicationUpdateInput>("SettingsApplicationUpdateInputType");
                   settingsApplicationUpdateInputValidator.ValidateAndThrow(settingsApplicationUpdateInput);
                   var settingsCommon = settingsApplicationUpdateInput.ToModel();
                   return await settingsManager.UpdateApplicationAsync(settingsCommon);
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
            
            Field<NonNullGraphType<SettingsType>, SettingsModel>()
               .Name("UpdateTasks")
               .Argument<NonNullGraphType<SettingsTasksUpdateInputType>, SettingsTasksUpdateInput>("SettingsTasksUpdateInputType", "Argument for update tasks settings")
               .ResolveAsync(async context =>
               {
                   if (!httpContextAccessor.HttpContext.User.Claims.IsAdministratOrHavePermissions(Permission.UpdateSettings))
                       throw new ExecutionError("You do not have permissions for update tasks settings");
                   var settingsTasksUpdateInput = context.GetArgument<SettingsTasksUpdateInput>("SettingsTasksUpdateInputType");
                   var settingsCommon = settingsTasksUpdateInput.ToModel();
                   var newSettings = await settingsManager.UpdateTasksAsync(settingsCommon);

                   var scheduler = await schedulerFactory.GetScheduler();
                   await scheduler.RescheduleJob(AutoCreateDaysOffTask.TriggerKey, await autoCreateDaysOffTask.CreateTriggerAsync());
                    if (newSettings.Tasks.AutoCreateDaysOff.IsEnabled)
                        await scheduler.ResumeJob(AutoCreateDaysOffTask.JobKey);
                    else
                        await scheduler.PauseJob(AutoCreateDaysOffTask.JobKey);
                   return newSettings;
               })
               .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
