using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave.DTO
{
    public class SickLeaveCreateInput : IModelable<SickLeaveModel>
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Comment { get; set; }
        public Guid UserId { get; set; }

        public SickLeaveModel ToModel()
        {
            return new SickLeaveModel
            {
                StartDate = this.StartDate,
                EndDate = this.EndDate,
                Comment = this.Comment,
                UserId = this.UserId,
            };
        }
    }

    public class SickLeaveCreateInputType : InputObjectGraphType<SickLeaveCreateInput>
    {
        public SickLeaveCreateInputType()
        {
            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("StartDate")
               .Resolve(context => context.Source.StartDate);

            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("EndDate")
               .Resolve(context => context.Source.EndDate);

            Field<StringGraphType, string?>()
               .Name("Comment")
               .Resolve(context => context.Source.Comment);

            Field<NonNullGraphType<GuidGraphType>, Guid>()
                .Name("UserId")
                .Resolve(context => context.Source.UserId);

        }
    }
}
