using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using TimeTracker.Business;
using TimeTracker.MsSql.TypeHandlers;

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
            SqlMapper.AddTypeHandler(new DateTimeTypeHandler());
            return new SqlConnection(ConnectionString);
        }

        public void ExecuteInTransaction(IEnumerable<Command> commands)
        {
            using (var connection = CreateConnection())
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        foreach (var command in commands)
                        {
                            connection.Execute(command.CommandText, command.Parameters, transaction);
                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        transaction.Rollback();
                    }
                }
            }
        }
    }
}
