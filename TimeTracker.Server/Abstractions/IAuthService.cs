using TimeTracker.Business.Enums;

namespace TimeTracker.Server.Abstractions
{
    public interface IAuthService
    {
        string GenerateAccessToken(Guid userId, string email, Role role, IEnumerable<Permission>? permissions);
        bool ComparePasswords(string inputPassword, string hashedPassword, string salt);
        string GenerateResetPasswordToken(Guid userId, string email);
        Guid? ValidatePasswordToken(string token);

    }
}
