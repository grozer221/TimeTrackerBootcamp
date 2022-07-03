using TimeTracker.Business.Enums;

namespace TimeTracker.Server.GraphQL.Modules.Auth
{
    public class AuthPolicies
    {
        public static readonly string Authenticated = "Authenticated";
        public static readonly string Employee = Role.Employee.ToString();
        public static readonly string Administrator = Role.Administrator.ToString();
    }
}
