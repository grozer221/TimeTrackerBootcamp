using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace TimeTracker.MsSql
{
    public class DapperContext
    {
        public static string DatabaseName
        {
            get => Regex.Match(ConnectionString, @"Initial Catalog=(\w+);").Groups[1].Value;
        }
        
        public static string ConnectionString
        {
            get => Environment.GetEnvironmentVariable("MS_SQL_CONNECTION_STRING");
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(ConnectionString);
        }
    }
}
