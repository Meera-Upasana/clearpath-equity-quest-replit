import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface BarRow {
  state: string;
  stateName: string;
  diabetes: number;
  obesity: number;
  tier: string;
}

interface Props {
  data: BarRow[];
  isLoading: boolean;
}

const tierColors: Record<string, string> = {
  critical: "#EF4444",
  high: "#F59E0B",
  moderate: "#10B981",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload as BarRow;
  return (
    <div className="bg-card border border-border rounded p-2 text-xs space-y-0.5">
      <p className="text-foreground font-semibold">{row?.stateName ?? label}</p>
      <p style={{ color: tierColors[row?.tier ?? "moderate"] }}>
        Diabetes: {row?.diabetes}%
      </p>
      <p className="text-primary">Obesity: {row?.obesity}%</p>
    </div>
  );
};

export function RiskBarChart({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-2 px-2 py-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full rounded" />
        ))}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
        <XAxis
          type="number"
          tick={{ fill: "#9CA3AF", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="state"
          tick={{ fill: "#9CA3AF", fontSize: 11, fontFamily: "IBM Plex Mono" }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11, color: "#9CA3AF", paddingTop: 8 }}
          formatter={(value) => (value === "diabetes" ? "Diabetes %" : "Obesity %")}
        />
        <Bar dataKey="diabetes" name="diabetes" stackId="a" radius={0}>
          {data.map((entry) => (
            <Cell key={entry.state} fill={tierColors[entry.tier]} fillOpacity={0.9} />
          ))}
        </Bar>
        <Bar dataKey="obesity" name="obesity" stackId="a" fill="#6366F1" fillOpacity={0.5} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
