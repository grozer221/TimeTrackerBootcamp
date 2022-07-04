using TimeTracker.Business.Abstractions;
using TimeTracker.Business.Enums;

namespace TimeTracker.Business.Models
{
    public class UserModel : BaseModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Role { get; private set; }
        public Role RoleEnum
        {
            get => Enum.Parse<Role>(Role);
            set => Role = value.ToString();
        }
    }
}
