import { useMemo, useState } from "react";
import { stateData, type MetricKey } from "@/data/stateHealthData";
import { Skeleton } from "@/components/ui/skeleton";
import type { CDCStateData } from "@/hooks/useCDCData";

const metricKeyMap: Record<string, MetricKey> = {
  "Diabetes %": "diabetes",
  "Obesity %": "obesity",
  "Smoking %": "smoking",
  "Hypertension %": "hypertension",
  "Mental Health %": "mentalHealth",
  "No Checkup %": "noCheckup",
};

interface Props {
  metric: string;
  cdcData?: CDCStateData[];
}

export function StateLeaderboard({ metric, cdcData }: Props) {
  const [showLowest, setShowLowest] = useState(false);
  const key = metricKeyMap[metric] || "diabetes";

  const sorted = useMemo(() => {
    let entries: { abbr: string; name: string; value: number }[];

    if (cdcData && cdcData.length > 0) {
      entries = cdcData.map((d) => ({
        abbr: d.locationabbr,
        name: d.locationdesc,
        value: d.value,
      }));
    } else {
      entries = Object.entries(stateData).map(([abbr, data]) => ({
        abbr,
        name: data.name,
        value: data[key],
      }));
    }

    entries.sort((a, b) => (showLowest ? a.value - b.value : b.value - a.value));
    return entries;
  }, [key, showLowest, cdcData]);

  const max = useMemo(() => Math.max(...sorted.map((s) => s.value)), [sorted]);

  if (!cdcData && sorted.length === 0) {
    return (
      <div className="bg-card border border-border rounded h-full flex flex-col">
        <div className="px-3 py-2 border-b border-border">
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="p-3 space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded h-full flex flex-col">
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">State Rankings</span>
        <div className="flex gap-1">
          <button
            data-testid="button-highest"
            onClick={() => setShowLowest(false)}
            className={`text-[10px] px-2 py-0.5 rounded ${!showLowest ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            Highest
          </button>
          <button
            data-testid="button-lowest"
            onClick={() => setShowLowest(true)}
            className={`text-[10px] px-2 py-0.5 rounded ${showLowest ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            Lowest
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[500px]">
        {sorted.map((s, i) => (
          <div
            key={s.abbr}
            data-testid={`row-state-${s.abbr}`}
            className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50 hover:bg-muted/30 transition-colors duration-150"
          >
            <span className="text-[10px] text-muted-foreground w-5 text-right font-mono">{i + 1}</span>
            <span className="text-xs font-mono text-primary w-7">{s.abbr}</span>
            <span className="text-xs text-foreground flex-1 truncate">{s.name}</span>
            <div className="w-16 bg-muted rounded-sm h-1.5 overflow-hidden">
              <div className="h-full bg-primary/70 rounded-sm" style={{ width: `${(s.value / max) * 100}%` }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-12 text-right">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
