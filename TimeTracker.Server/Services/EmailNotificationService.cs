using MailKit.Net.Smtp;
using MimeKit;
using TimeTracker.Server.Abstractions;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit.Text;

namespace TimeTracker.Server.Services
{
    public class EmailNotificationService : INotification
    {
        public async Task SendMessageAsync(string to, string title, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Замінити", "at30_lmo@student.ztu.edu.ua"));
            emailMessage.To.Add(new MailboxAddress("", to));
            emailMessage.Subject = title;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                await client.AuthenticateAsync("grozermailpassreset@gmail.com", "bafwiiewuniwbzgw");
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
