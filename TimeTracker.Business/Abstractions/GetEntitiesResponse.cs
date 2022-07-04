using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeTracker.Business.Abstractions
{
    public class GetEntitiesResponse<T> where T : BaseModel
    {
        public IEnumerable<T> Entities { get; set; }
        public int Total { get; set; }
        public int PageSize { get; set; }
    }
}
