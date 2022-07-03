using GraphQL;
using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Business.Repositories;
using TimeTracker.Server.GraphQL.Modules.Auth.DTO;
using TimeTracker.Server.Services;

namespace TimeTracker.Server.GraphQL.Modules.Auth
{
    public class AuthMutations : ObjectGraphType
    {
        public AuthMutations(IUserRepository userRepository, AuthService authService)
        {
            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Login")
                .Argument<NonNullGraphType<AuthLoginInputType>, AuthLoginInput>("AuthLoginInputType", "Argument for login User")
                .ResolveAsync(async context =>
                {
                    AuthLoginInput authLoginInput = context.GetArgument<AuthLoginInput>("AuthLoginInputType");
                    var user = await userRepository.GetByEmailAsync(authLoginInput.Email);
                    if (user != null && user.Password != authLoginInput.Password)
                        throw new Exception("Bad credentials");
                    return new AuthResponse()
                    {
                        Token = authService.GenerateAccessToken(user.Id, user.Email, user.RoleEnum),
                        User = user,
                    };
                });

            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Register")
                .Argument<NonNullGraphType<AuthRegisterInputType>, AuthRegisterInput>("AuthRegisterInputType", "Argument for register User")
                .ResolveAsync(async context =>
                {
                    var users = await userRepository.GetAsync();
                    if (users.Count() > 0)
                        throw new Exception("Ви не можете самостійно зареєструватися. Зверніться до адміністратора");

                    AuthRegisterInput authRegisterInput = context.GetArgument<AuthRegisterInput>("AuthRegisterInputType");
                    UserModel user = await userRepository.CreateAsync(new UserModel
                    {
                        Email = authRegisterInput.Email,
                        Password = authRegisterInput.Password,
                        FirstName = authRegisterInput.FirstName,
                        LastName = authRegisterInput.LastName,
                        MiddleName = authRegisterInput.MiddleName,
                        RoleEnum = Role.Administrator,
                    });
                    return new AuthResponse()
                    {
                        Token = authService.GenerateAccessToken(user.Id, user.Email, user.RoleEnum),
                        User = user,
                    };
                });

            //Field<BooleanGraphType, bool>()
            //    .Name("ChangePassword")
            //    .Argument<NonNullGraphType<ChangePasswordInputType>, ChangePassword>("ChangePasswordInputType", "Argument for change User password")
            //    .ResolveAsync(async context =>
            //    {
            //        var changePassword = context.GetArgument<ChangePassword>("ChangePasswordInputType");
            //        string userLogin = httpContextAccessor.HttpContext.GetUserLogin();
            //        UserModel user = await usersRepository.GetByLoginAsync(userLogin);
            //        if (user.Password != changePassword.OldPassword)
            //            throw new Exception("Bad old password");
            //        if (changePassword.NewPassword.Length < 3)
            //            throw new Exception("Lenght of new password must be greater then 3 symbols");
            //        user.Password = changePassword.NewPassword;
            //        await usersRepository.UpdateAsync(user);
            //        return true;
            //    })
            //    .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}
