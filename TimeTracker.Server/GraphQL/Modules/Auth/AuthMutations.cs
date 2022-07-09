using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.GraphQL.Modules.Auth.DTO;
using TimeTracker.Server.Services;
using TimeTracker.Server.Extensions;
using Microsoft.Net.Http.Headers;

namespace TimeTracker.Server.GraphQL.Modules.Auth
{
    public class AuthMutations : ObjectGraphType
    {
        public AuthMutations(IUserRepository userRepository, AuthService authService, ITokenRepository tokenRepository, IHttpContextAccessor httpContextAccessor)
        {
            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Login")
                .Argument<NonNullGraphType<AuthLoginInputType>, AuthLoginInput>("AuthLoginInputType", "Argument for login User")
                .ResolveAsync(async context =>
                {
                    AuthLoginInput authLoginInput = context.GetArgument<AuthLoginInput>("AuthLoginInputType");
                    new AuthLoginInputValidator().ValidateAndThrowExceptions(authLoginInput);
                    var user = await userRepository.GetByEmailAsync(authLoginInput.Email);
                    if (user != null && user.Password != authLoginInput.Password)
                        throw new Exception("Bad credentials");
                    TokenModel token = new TokenModel
                    {
                        Token = authService.GenerateAccessToken(user.Id, user.Email, user.RoleEnum),
                        UserId = user.Id,
                    };
                    token = await tokenRepository.CreateAsync(token);
                    return new AuthResponse()
                    {
                        Token = token.Token,
                        User = user,
                    };
                });
            
            Field<NonNullGraphType<BooleanGraphType>, bool>()
                .Name("Logout")
                .ResolveAsync(async context =>
                {
                    var userId = httpContextAccessor.HttpContext.GetUserId();
                    var token = httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Authorization];
                    await tokenRepository.RemoveAsync(userId, token);
                    return true;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Register")
                .Argument<NonNullGraphType<AuthRegisterInputType>, AuthRegisterInput>("AuthRegisterInputType", "Argument for register User")
                .ResolveAsync(async context =>
                {
                    var users = await userRepository.GetAsync();
                    if (users.Count() > 0)
                        throw new Exception("You can not register manually. Contact an administrator");

                    AuthRegisterInput authRegisterInput = context.GetArgument<AuthRegisterInput>("AuthRegisterInputType");
                    await new AuthRegisterInputValidator(userRepository).ValidateAndThrowExceptionsAsync(authRegisterInput);
                    UserModel user = await userRepository.CreateAsync(new UserModel
                    {
                        Email = authRegisterInput.Email,
                        Password = authRegisterInput.Password,
                        FirstName = authRegisterInput.FirstName,
                        LastName = authRegisterInput.LastName,
                        MiddleName = authRegisterInput.MiddleName,
                        RoleEnum = Role.Administrator,
                    });
                    TokenModel token = new TokenModel
                    {
                        Token = authService.GenerateAccessToken(user.Id, user.Email, user.RoleEnum),
                        UserId = user.Id,
                    };
                    token = await tokenRepository.CreateAsync(token);
                    return new AuthResponse()
                    {
                        Token = token.Token,
                        User = user,
                    };
                });

            Field<BooleanGraphType, bool>()
                .Name("ChangePassword")
                .Argument<NonNullGraphType<AuthChangePasswordInputType>, AuthChangePasswordInput>("AuthChangePasswordInputType", "Argument for change User password")
                .ResolveAsync(async context =>
                {
                    var authChangePasswordInput = context.GetArgument<AuthChangePasswordInput>("AuthChangePasswordInputType");
                    new AuthChangePasswordInputValidation().ValidateAndThrowExceptions(authChangePasswordInput);
                    var userId = httpContextAccessor.HttpContext.GetUserId();
                    var user = await userRepository.GetByIdAsync(userId);
                    if (user.Password != authChangePasswordInput.OldPassword)
                        throw new Exception("Bad old password");
                    await userRepository.UpdatePasswordAsync(user.Id, authChangePasswordInput.NewPassword);
                    await tokenRepository.RemoveAllForUserAsync(userId);
                    return true;
                })
                .AuthorizeWith(AuthPolicies.Authenticated);

            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Impersonate")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("UserId", "Argument for Impersonate User")
                .ResolveAsync(async context =>
                {
                    var impersonateUserId = context.GetArgument<Guid>("UserId");
                    var impersonateUser = await userRepository.GetByIdAsync(impersonateUserId);
                    if (impersonateUser == null)
                        throw new ExecutionError("User not found");
                    TokenModel token = new TokenModel
                    {
                        Token = authService.GenerateAccessToken(impersonateUser.Id, impersonateUser.Email, impersonateUser.RoleEnum),
                        UserId = impersonateUser.Id,
                    };
                    token = await tokenRepository.CreateAsync(token);
                    return new AuthResponse()
                    {
                        Token = token.Token,
                        User = impersonateUser,
                    };
                })
                .AuthorizeWith(AuthPolicies.Administrator);
        }
    }
}
