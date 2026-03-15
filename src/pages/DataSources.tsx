import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArchitectureDiagram } from "@/components/sources/ArchitectureDiagram";
import { RefreshCw, Loader2 } from "lucide-react";

interface SourceStatus {
  status: "ok" | "error" | "checking" | "unknown";
  ms?: number;
}

interface HealthData {
  cdc: "ok" | "error";
  cdc_ms: number;
  hrsa: "ok" | "error";
  hrsa_ms: number;
  usaspending: "ok" | "error";
  usaspending_ms: number;
  anthropic: "ok" | "error";
  anthropic_ms: number;
  [key: string]: any;
  timestamp: string;
}

const sources = [
  {
    key: "cdc" as const,
    name: "CDC PLACES API",
    endpoint: "https://chronicdata.cdc.gov/resource/swc5-untb.json",
    records: "3,142 counties · 36 health measures",
    description: "Population-level chronic disease prevalence, risk behaviors, and prevention data at county and census tract level.",
  },
  {
    key: "hrsa" as const,
    name: "HRSA Data Warehouse API",
    endpoint: "https://data.hrsa.gov/api/download",
    records: "All FQHCs, funded sites, look-alike sites",
    description: "Federally Qualified Health Center locations, service areas, patient populations, and federal funding levels.",
  },
  {
    key: "usaspending" as const,
    name: "USAspending.gov API",
    endpoint: "https://api.usaspending.gov/api/v2/",
    records: "All federal grants, last 24 months, healthcare category",
    description: "Federal award obligations by recipient, geography, CFDA program, and awarding agency.",
  },
  {
    key: "anthropic" as const,
    name: "Hugging Face Inference API",
    endpoint: "https://api-inference.huggingface.co/models/",
    records: "Mistral-7B-Instruct · Grant proposal AI generation",
    description: "Free hosted inference for Mistral-7B-Instruct. Powers the Grant Proposal Builder. Rate limited to ~10 requests/minute on the shared tier. Requires HF_TOKEN in secrets.",
  },
];

export default function DataSources() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [testingKey, setTestingKey] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health");
      const data: HealthData = await res.json();
      setHealth(data);
      setLastRefreshed(new Date());
    } catch {
      // server not ready yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 60000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  const handleTestOne = async (key: string) => {
    setTestingKey(key);
    await fetchHealth();
    setTestingKey(null);
  };

  const getStatus = (key: string): SourceStatus => {
    if (loading && testingKey === key) return { status: "checking" };
    if (!health) return { status: "unknown" };
    const s = health[key as keyof HealthData] as "ok" | "error";
    const ms = health[`${key}_ms` as keyof HealthData] as number;
    return { status: s, ms };
  };

  const statusLabel = (s: SourceStatus) => {
    if (s.status === "checking") return "CHECKING";
    if (s.status === "unknown") return "UNKNOWN";
    return s.status === "ok" ? "CONNECTED" : "ERROR";
  };

  const statusClass = (s: SourceStatus) => {
    if (s.status === "ok") return "border-success text-success";
    if (s.status === "checking" || s.status === "unknown") return "border-warning text-warning";
    return "border-destructive text-destructive";
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Data Sources</h1>
        <div className="flex items-center gap-3">
          {lastRefreshed && (
            <span className="text-[11px] text-muted-foreground font-mono">
              Last checked: {lastRefreshed.toLocaleTimeString()}
            </span>
          )}
          <Button
            data-testid="button-refresh-all"
            variant="outline"
            size="sm"
            onClick={fetchHealth}
            disabled={loading}
            className="gap-1.5 text-xs"
          >
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
            Refresh All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sources.map((s) => {
          const status = getStatus(s.key);
          return (
            <Card key={s.name} className="bg-card border-border" data-testid={`card-source-${s.key}`}>
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-foreground">{s.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {status.ms != null && (
                      <span className="text-[10px] font-mono text-muted-foreground">{status.ms}ms</span>
                    )}
                    <Badge
                      variant="outline"
                      data-testid={`status-${s.key}`}
                      className={`text-[10px] font-mono ${statusClass(status)}`}
                    >
                      {statusLabel(status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                <p className="text-xs text-muted-foreground font-mono break-all">{s.endpoint}</p>
                <p className="text-xs text-muted-foreground">{s.description}</p>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{s.records}</span>
                </div>
                <Button
                  data-testid={`button-test-${s.key}`}
                  variant="outline"
                  size="sm"
                  className="text-xs w-full mt-1"
                  onClick={() => handleTestOne(s.key)}
                  disabled={loading}
                >
                  {testingKey === s.key ? (
                    <><Loader2 className="h-3 w-3 animate-spin mr-1.5" />Testing...</>
                  ) : (
                    "Test Connection"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-medium text-foreground">System Architecture</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ArchitectureDiagram />
        </CardContent>
      </Card>
    </div>
  );
}
