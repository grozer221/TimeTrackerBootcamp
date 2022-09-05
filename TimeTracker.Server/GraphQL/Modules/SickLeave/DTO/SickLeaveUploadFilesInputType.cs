using GraphQL.Types;
using GraphQL.Upload.AspNetCore;

namespace TimeTracker.Server.GraphQL.Modules.SickLeave.DTO
{
    public class SickLeaveUploadFilesInput 
    {
        public Guid Id { get; set; }
        public IEnumerable<string> UploadedFiles { get; set; }
        public IEnumerable<IFormFile> UploadFiles { get; set; }
    }

    public class SickLeaveUploadFilesInputType : InputObjectGraphType<SickLeaveUploadFilesInput>
    {
        public SickLeaveUploadFilesInputType()
        {
            Field<NonNullGraphType<GuidGraphType>, Guid>()
                .Name("Id")
                .Resolve(context => context.Source.Id);
            
            Field<NonNullGraphType<ListGraphType<StringGraphType>>, IEnumerable<string>>()
                .Name("UploadedFiles")
                .Resolve(context => context.Source.UploadedFiles);
            
            Field<NonNullGraphType<ListGraphType<UploadGraphType>>, IEnumerable<IFormFile>>()
                .Name("UploadFiles")
                .Resolve(context => context.Source.UploadFiles);
        }
    }
}
