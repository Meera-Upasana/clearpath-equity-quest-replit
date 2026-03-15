import { useMutation } from "@tanstack/react-query";

export interface CompetitiveAnalysisResult {
  target_zip: string;
  comparison_zips: string[];
  winner_zip: string;
  reasoning_factors: string[];
  fqhc_gaps: string[];
  funding_gaps: string[];
  recommendation_tier: "priority_1" | "priority_2" | "monitor";
  hrsa_data: Record<string, {
    zip: string;
    fqhc_count: number | null;
    nearest_fqhc_miles: number | null;
    coverage_tier: string;
  }>;
  funding_data: Record<string, {
    zip: string;
    total_awards: number | null;
    total_amount: number | null;
  }>;
  cdc_state_data: {
    state: string;
    state_name: string;
    diabetes_rate: number | null;
    obesity_rate: number | null;
  } | null;
  intel_insights: {
    fqhc_insight: string;
    grants_insight: string;
    recommendation: string;
  } | null;
}

export function useCompetitiveAnalysis() {
  return useMutation<
    CompetitiveAnalysisResult,
    Error,
    { target_zip: string; comparison_zips?: string[] }
  >({
    mutationFn: async ({ target_zip, comparison_zips }) => {
      const res = await fetch("/api/competitive-intelligence/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_zip, comparison_zips }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      return res.json();
    },
  });
}
