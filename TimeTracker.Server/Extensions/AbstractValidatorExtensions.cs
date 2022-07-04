using FluentValidation;

namespace TimeTracker.Server.Extensions
{
    public static class AbstractValidatorExtensions
    {
        public static void ValidateAndThrowExceptions<T>(this AbstractValidator<T> abstractValidator, T instance)
        {
            var validationResult = abstractValidator.Validate(instance);
            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                    throw new Exception(error.ErrorMessage);
            }
        }
        
        public static async Task ValidateAndThrowExceptionsAsync<T>(this AbstractValidator<T> abstractValidator, T instance)
        {
            var validationResult = await abstractValidator.ValidateAsync(instance);
            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                    throw new Exception(error.ErrorMessage);
            }
        }
    }
}
