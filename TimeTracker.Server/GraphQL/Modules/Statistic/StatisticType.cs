using GraphQL.Types;
using TimeTracker.Business.Enums;
using TimeTracker.Business.Models;
using TimeTracker.Server.GraphQL.Abstractions;
using TimeTracker.Server.GraphQL.EnumTypes;

namespace TimeTracker.Server.GraphQL.Modules.Statistic
{
    public class StatisticType : BaseType<StatisticModel>
    {
        public StatisticType() : base()
        {
            Field<FloatGraphType, double>()
                .Name("WorkerHours")
                .Resolve(context => context.Source.WorkerHours);

            Field<IntGraphType, int>()
                .Name("MonthHours")
                .Resolve(context => context.Source.MonthHours);
        }
    }
}
