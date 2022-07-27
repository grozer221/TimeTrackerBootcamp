using GraphQL.Types;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;

namespace TimeTracker.Server.GraphQL.Modules.VacationRequests.DTO
{
    public class VacationRequestsUpdateInput : IModelable<VacationRequestModel>
    {
        public Guid Id { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public string? Comment { get; set; }

        public VacationRequestModel ToModel()
        {
            return new VacationRequestModel
            {
                Id = this.Id,
                DateStart = this.DateStart,
                DateEnd = this.DateEnd,
                Comment = this.Comment,
            };
        }
    }

    public class VacationRequestsUpdateInputType : InputObjectGraphType<VacationRequestsUpdateInput>
    {
        public VacationRequestsUpdateInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
               .Name("Id")
               .Resolve(context => context.Source.Id);
            
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
