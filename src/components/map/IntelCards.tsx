import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import type { CompetitiveAnalysisResult } from "@/hooks/useCompetitiveAnalysis";

const DEFAULT_CARDS = [
  {
    borderColor: "border-primary",
    title: "FQHC Coverage",
    content: "Enter a ZIP code above and click Analyze to load live HRSA coverage data.",
    badge: "AWAITING INPUT",
    badgeColor: "text-muted-foreground",
    aiGenerated: false,
  },
  {
    borderColor: "border-warning",
    title: "Federal Grants (24mo)",
    content: "Live USAspending.gov data will appear here after analysis.",
    badge: "AWAITING INPUT",
    badgeColor: "text-muted-foreground",
    aiGenerated: false,
  },
  {
    borderColor: "border-success",
    title: "Strategic Recommendation",
    content: "Competitive intelligence analysis will generate a prioritized recommendation.",
    badge: "AWAITING INPUT",
    badgeColor: "text-muted-foreground",
    aiGenerated: false,
  },
];

interface Props {
  analysisResult: CompetitiveAnalysisResult | null;
  isLoading?: boolean;
}

function tierBadge(tier: string): { label: string; color: string } {
  if (tier === "priority_1") return { label: "PRIORITY 1", color: "text-success" };
  if (tier === "priority_2") return { label: "PRIORITY 2", color: "text-warning" };
  return { label: "MONITOR", color: "text-muted-foreground" };
}

function buildCards(result: CompetitiveAnalysisResult) {
  const targetHrsa = result.hrsa_data[result.target_zip];
  const targetFunding = result.funding_data[result.target_zip];
  const { label, color } = tierBadge(result.recommendation_tier);
  const insights = result.intel_insights;

  const fqhcFallback = targetHrsa
    ? `ZIP ${result.target_zip}: ${targetHrsa.fqhc_count ?? "unknown"} FQHCs within 10 miles. ${
        targetHrsa.nearest_fqhc_miles != null
          ? `Nearest facility is ${Math.round(targetHrsa.nearest_fqhc_miles * 10) / 10} miles away.`
          : ""
      } Coverage tier: ${targetHrsa.coverage_tier}.`
    : "HRSA data unavailable.";

  const compFundingParts = Object.entries(result.funding_data)
    .filter(([zip]) => zip !== result.target_zip)
    .map(([zip, d]) =>
      d.total_amount != null ? `ZIP ${zip}: $${d.total_amount.toLocaleString()}` : `ZIP ${zip}: $0`
    )
    .join(". ");

  const grantsFallback = `ZIP ${result.target_zip}: $${(targetFunding?.total_amount || 0).toLocaleString()} awarded. ${compFundingParts}`;
  const recommendationFallback = result.reasoning_factors.slice(0, 3).join(" · ");

  return [
    {
      borderColor: "border-primary",
      title: "FQHC Coverage",
      content: insights?.fqhc_insight || fqhcFallback,
      badge: targetHrsa?.coverage_tier === "desert" ? "GAP IDENTIFIED" : targetHrsa?.coverage_tier?.toUpperCase() || "LIVE",
      badgeColor: targetHrsa?.coverage_tier === "desert" ? "text-primary" : "text-muted-foreground",
      aiGenerated: !!insights?.fqhc_insight,
    },
    {
      borderColor: "border-warning",
      title: "Federal Grants (24mo)",
      content: insights?.grants_insight || grantsFallback,
      badge: !targetFunding?.total_amount ? "FUNDING DESERT" : "FUNDED",
      badgeColor: !targetFunding?.total_amount ? "text-warning" : "text-success",
      aiGenerated: !!insights?.grants_insight,
    },
    {
      borderColor: "border-success",
      title: "Strategic Recommendation",
      content: insights?.recommendation || recommendationFallback || "Analysis complete.",
      badge: label,
      badgeColor: color,
      aiGenerated: !!insights?.recommendation,
    },
  ];
}

export function IntelCards({ analysisResult, isLoading }: Props) {
  const cards = analysisResult ? buildCards(analysisResult) : DEFAULT_CARDS;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {["FQHC Coverage", "Federal Grants (24mo)", "Strategic Recommendation"].map((title) => (
          <Card key={title} className="bg-card border-l-2 border-muted">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {cards.map((c) => (
        <Card
          key={c.title}
          className={`bg-card ${c.borderColor} border-l-2`}
          data-testid={`card-intel-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-foreground">{c.title}</span>
              <span className={`text-[10px] font-mono font-medium shrink-0 ${c.badgeColor}`}>{c.badge}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.content}</p>
            {c.aiGenerated && (
              <div className="flex items-center gap-1 pt-1">
                <Sparkles className="h-2.5 w-2.5 text-violet-400" />
                <span className="text-[9px] font-mono text-violet-400/70">AI · CDC + HRSA + USAspending</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
