using System.Diagnostics;
using TimeTracker.Server.Abstractions;

namespace TimeTracker.Server.Services
{
    public class CmdCommandService : ICmdCommandService
    {
        private Process process;

        public void Run(string directory, string command)
        {
            var processStartInfo = new ProcessStartInfo()
            {
                FileName = "cmd",
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                WorkingDirectory = directory
            };

            process = Process.Start(processStartInfo);
            process.BeginOutputReadLine();
            process.OutputDataReceived += (sender, eventArgs) =>
            {
                Console.WriteLine(eventArgs.Data);
            };
            process.StandardInput.WriteLine($"start cmd.exe /c {command} & exit");
            process.Dispose();
        }
    }
}
