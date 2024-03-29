﻿using FluentValidation;
using GraphQL.Types;

namespace TimeTracker.Server.GraphQL.Modules.Auth.DTO
{
    public class AuthChangePasswordInputValidation : AbstractValidator<AuthChangePasswordInput>
    {
        public AuthChangePasswordInputValidation()
        {
            RuleFor(l => l.OldPassword)
                .NotEmpty()
                .NotNull();

            RuleFor(l => l.NewPassword)
                .MinimumLength(5)
                .NotEmpty()
                .NotNull();
        }
    }
}
