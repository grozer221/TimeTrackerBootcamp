using FluentValidation;

namespace TimeTracker.Server.GraphQL.Abstractions
{
    public static class AbstractValidatorExtensions
    {
        public static void ValidateAndThrow<T>(this AbstractValidator<T> abstractValidator, T instance)
        {
            var validationResult = abstractValidator.Validate(instance);
            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                    throw new Exception(error.ErrorMessage);
            }
        }
    }
}
