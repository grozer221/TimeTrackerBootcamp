using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TimeTracker.Business.Enums;
using TimeTracker.Server.Abstractions;
using TimeTracker.Server.Extensions;
using TimeTracker.Server.GraphQL.Modules.Auth;

namespace TimeTracker.Server.Services
{
    public class AuthService : IAuthService
    {
        public string GenerateAccessToken(Guid userId, string email, Role role, IEnumerable<Permission>? permissions)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("AuthIssuerSigningKey")));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>
            {
                new Claim(AuthClaimsIdentity.DefaultIdClaimType, userId.ToString()),
                new Claim(AuthClaimsIdentity.DefaultEmailClaimType, email),
                new Claim(AuthClaimsIdentity.DefaultRoleClaimType, role.ToString()),
                new Claim(AuthClaimsIdentity.DefaultPermissionsClaimType, JsonConvert.SerializeObject(permissions, new StringEnumConverter())),
            };
            JwtSecurityToken token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: signingCredentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool ComparePasswords(string inputPassword, string hashedPassword, string salt)
        {
            return (inputPassword + salt).CreateMD5() == hashedPassword;
        }

        public string GenerateResetPasswordToken(Guid userId, string email)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("ResetSigningKey")));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>
            {
                new Claim(AuthClaimsIdentity.DefaultIdClaimType, userId.ToString()),
                new Claim(AuthClaimsIdentity.DefaultEmailClaimType, email)
            };
            JwtSecurityToken token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signingCredentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Guid? ValidatePasswordToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("ResetSigningKey"))),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            try
            {
                var claimsPrincipal = handler.ValidateToken(token, validations, out var tokenSecure);
                return claimsPrincipal.Claims.GetUserId();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
