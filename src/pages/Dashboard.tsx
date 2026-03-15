import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, TrendingUp, DollarSign, Target } from "lucide-react";
import { RiskBarChart } from "@/components/dashboard/RiskBarChart";
import { ScatterChart } from "@/components/dashboard/ScatterPlot";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Dashboard() {
  const { isLoading, kpis, barChartData, scatterData, activityLog, source } = useDashboardData();

  const kpiCards = [
    {
      label: "High-Risk States Identified",
      value: kpis ? `${kpis.highRiskCount}` : "—",
      sub: "diabetes ≥ 14.5%",
      icon: AlertTriangle,
      accent: "text-destructive",
      testId: "kpi-high-risk-states",
    },
    {
      label: "Avg Diabetes Rate (All States)",
      value: kpis ? `${kpis.avgDiabetesRate}%` : "—",
      sub: "CDC PLACES 2023",
      icon: Target,
      accent: "text-warning",
      testId: "kpi-avg-diabetes",
    },
    {
      label: "Highest-Risk State",
      value: kpis ? kpis.topStateName : "—",
      sub: kpis ? `${kpis.topStateRate}% diabetes rate` : "",
      icon: DollarSign,
      accent: "text-primary",
      testId: "kpi-top-state",
    },
    {
      label: "Data Source Status",
      value: source === "live" ? "Live" : source === "cache" ? "Cached" : source === "fallback" ? "Fallback" : "—",
      sub: source === "live" ? "CDC API active" : source === "fallback" ? "Using static data" : "Loading…",
      icon: TrendingUp,
      accent: source === "live" ? "text-success" : "text-warning",
      testId: "kpi-data-source",
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4">
      <h1 className="text-lg font-semibold text-foreground">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((k) => (
          <Card key={k.label} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {k.label}
              </CardTitle>
              <k.icon className={`h-4 w-4 ${k.accent}`} />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              {isLoading ? (
                <Skeleton className="h-8 w-24 rounded" />
              ) : (
                <>
                  <div
                    className="text-2xl font-bold text-foreground"
                    data-testid={k.testId}
                  >
                    {k.value}
                  </div>
                  {k.sub && (
                    <p className="text-xs text-muted-foreground mt-0.5">{k.sub}</p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-foreground">
              Top 10 States by Diabetes Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <RiskBarChart data={barChartData} isLoading={isLoading} />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-foreground">
              Diabetes % vs Obesity % (by State)
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ScatterChart
              highRisk={scatterData.highRisk}
              lowerRisk={scatterData.lowerRisk}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      <ActivityLog entries={activityLog} isLoading={isLoading} />
    </div>
  );
}
