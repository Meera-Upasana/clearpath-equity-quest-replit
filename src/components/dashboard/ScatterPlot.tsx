import {
  ScatterChart as RechartsScatter,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface ScatterPoint {
  x: number;
  y: number;
  state: string;
  stateName: string;
}

interface Props {
  highRisk: ScatterPoint[];
  lowerRisk: ScatterPoint[];
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as ScatterPoint;
  return (
    <div className="bg-card border border-border rounded p-2 text-xs space-y-0.5">
      <p className="text-foreground font-semibold">{d.stateName}</p>
      <p className="text-muted-foreground">Diabetes: {d.x}%</p>
      <p className="text-muted-foreground">Obesity: {d.y}%</p>
    </div>
  );
};

export function ScatterChart({ highRisk, lowerRisk, isLoading }: Props) {
  if (isLoading) {
    return <Skeleton className="h-[320px] w-full rounded" />;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RechartsScatter margin={{ top: 10, right: 20, bottom: 24, left: 10 }}>
        <XAxis
          type="number"
          dataKey="x"
          name="Diabetes %"
          tick={{ fill: "#9CA3AF", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          label={{ value: "Diabetes %", position: "insideBottom", offset: -12, fill: "#9CA3AF", fontSize: 11 }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Obesity %"
          tick={{ fill: "#9CA3AF", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          label={{ value: "Obesity %", angle: -90, position: "insideLeft", fill: "#9CA3AF", fontSize: 11 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11, color: "#9CA3AF", paddingTop: 8 }}
          formatter={(value) => (value === "High Risk" ? "High Risk (≥14.5% diabetes)" : "Lower Risk")}
        />
        <Scatter name="High Risk" data={highRisk} fill="#EF4444" fillOpacity={0.75} />
        <Scatter name="Lower Risk" data={lowerRisk} fill="#3B82F6" fillOpacity={0.6} />
      </RechartsScatter>
    </ResponsiveContainer>
  );
}
