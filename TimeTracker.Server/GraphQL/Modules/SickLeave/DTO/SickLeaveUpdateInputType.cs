using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave.DTO
{
    public class SickLeaveUpdateInput : IModelable<SickLeaveModel>
    {
        public Guid Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Comment { get; set; }

        public SickLeaveModel ToModel()
        {
            return new SickLeaveModel
            {
                Id = this.Id,
                StartDate = this.StartDate.Value,
                EndDate = this.EndDate.Value,
                Comment = this.Comment,
            };
        }
    }

    public class SickLeaveUpdateInputType : InputObjectGraphType<SickLeaveUpdateInput>
    {
        public SickLeaveUpdateInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
                .Name("Id")
                .Resolve(context => context.Source.Id);

            Field<DateGraphType, DateTime>()
               .Name("StartDate")
               .Resolve(context => context.Source.StartDate.Value);

            Field<DateGraphType, DateTime>()
               .Name("EndDate")
               .Resolve(context => context.Source.EndDate.Value);

            Field<StringGraphType, string?>()
               .Name("Comment")
               .Resolve(context => context.Source.Comment);
        }
    }
}
