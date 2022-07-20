using TimeTracker.Business.Enums;

namespace TimeTracker.Server.Abstractions
{
    public interface IAuthService
    {
        string GenerateAccessToken(Guid userId, string email, Role role, IEnumerable<Permission>? permissions);
        bool ComparePasswords(string inputPassword, string hashedPassword, string salt);
    }
}
