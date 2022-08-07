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

        public SickLeaveModel ToModel()
        {
            return new SickLeaveModel
            {
                StartDate = this.StartDate,
                EndDate = this.EndDate,
                Comment = this.Comment,
            };
        }
    }

    public class SickLeaveInputType : InputObjectGraphType<SickLeaveCreateInput>
    {
        public SickLeaveInputType()
        {
            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("DateStart")
               .Resolve(context => context.Source.StartDate);

            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("DateEnd")
               .Resolve(context => context.Source.EndDate);

            Field<StringGraphType, string?>()
               .Name("Comment")
               .Resolve(context => context.Source.Comment);
        }
    }
}
