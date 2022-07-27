using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsCreateInput : IModelable<VacationRequestModel>
    {
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public string? Comment { get; set; }

        public VacationRequestModel ToModel()
        {
            return new VacationRequestModel
            {
                DateStart = this.DateStart,
                DateEnd = this.DateEnd,
                Comment = this.Comment,
            };
        }
    }

    public class VacationRequestsCreateInputType : InputObjectGraphType<VacationRequestsCreateInput>
    {
        public VacationRequestsCreateInputType()
        {
            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("DateStart")
               .Resolve(context => context.Source.DateStart);

            Field<NonNullGraphType<DateGraphType>, DateTime>()
               .Name("DateEnd")
               .Resolve(context => context.Source.DateEnd);

            Field<StringGraphType, string?>()
               .Name("Comment")
               .Resolve(context => context.Source.Comment);
        }
    }
}
