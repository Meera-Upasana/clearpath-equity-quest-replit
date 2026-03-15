import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { USMap } from "@/components/map/USMap";
import { StateLeaderboard } from "@/components/map/StateLeaderboard";
import { IntelCards } from "@/components/map/IntelCards";
import { useCDCData } from "@/hooks/useCDCData";
import { useCompetitiveAnalysis, type CompetitiveAnalysisResult } from "@/hooks/useCompetitiveAnalysis";
import { Search, Loader2 } from "lucide-react";

const metrics = ["Diabetes %", "Obesity %", "Smoking %", "Hypertension %", "Mental Health %", "No Checkup %"] as const;
type Metric = typeof metrics[number];

export default function MapIntelligence() {
  const [activeMetric, setActiveMetric] = useState<Metric>("Diabetes %");
  const [zipInput, setZipInput] = useState("85035");
  const [analysisResult, setAnalysisResult] = useState<CompetitiveAnalysisResult | null>(null);

  const cdcQuery = useCDCData(activeMetric);
  const competitive = useCompetitiveAnalysis();

  const handleAnalyze = () => {
    if (!/^\d{5}$/.test(zipInput)) return;
    competitive.mutate(
      { target_zip: zipInput },
      { onSuccess: (data) => setAnalysisResult(data) }
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-lg font-semibold text-foreground">Map Intelligence</h1>
        {cdcQuery.data?.source === "fallback" && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/40 text-amber-400 border border-amber-700/50">
            Using cached data
          </span>
        )}
        {cdcQuery.data?.source === "live" && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-900/40 text-green-400 border border-green-700/50">
            Live CDC data
          </span>
        )}
      </div>

      {/* ZIP Search */}
      <div className="flex gap-2 max-w-sm">
        <Input
          data-testid="input-zip-search"
          value={zipInput}
          onChange={(e) => setZipInput(e.target.value)}
          placeholder="Enter ZIP code (e.g. 85035)"
          className="bg-muted border-border text-sm font-mono"
          maxLength={5}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
        />
        <Button
          data-testid="button-analyze-zip"
          onClick={handleAnalyze}
          disabled={competitive.isPending || !/^\d{5}$/.test(zipInput)}
          size="sm"
          className="gap-1.5"
        >
          {competitive.isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Search className="h-3.5 w-3.5" />
          )}
          Analyze
        </Button>
      </div>

      {/* Metric tabs */}
      <div className="flex flex-wrap gap-1">
        {metrics.map((m) => (
          <button
            key={m}
            data-testid={`tab-metric-${m.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => setActiveMetric(m)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 ${
              activeMetric === m
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Map + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <USMap metric={activeMetric} cdcData={cdcQuery.data?.data} isLoading={cdcQuery.isLoading} />
            </CardContent>
          </Card>
        </div>
        <div>
          <StateLeaderboard metric={activeMetric} cdcData={cdcQuery.data?.data} />
        </div>
      </div>

      {/* Intel Cards */}
      <IntelCards analysisResult={analysisResult} isLoading={competitive.isPending} />
    </div>
  );
}
