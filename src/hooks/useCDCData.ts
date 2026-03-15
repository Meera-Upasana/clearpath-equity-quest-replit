import { useQuery } from "@tanstack/react-query";

export type CDCMetric = "diabetes" | "obesity" | "smoking" | "hypertension" | "mentalHealth" | "noCheckup";

export interface CDCStateData {
  locationabbr: string;
  locationdesc: string;
  value: number;
  year: string;
}

const metricParamMap: Record<string, CDCMetric> = {
  "Diabetes %": "diabetes",
  "Obesity %": "obesity",
  "Smoking %": "smoking",
  "Hypertension %": "hypertension",
  "Mental Health %": "mentalHealth",
  "No Checkup %": "noCheckup",
};

export function useCDCData(metricLabel: string) {
  const metric = metricParamMap[metricLabel] || "diabetes";

  return useQuery<{ data: CDCStateData[]; source: "live" | "cache" | "fallback" }>({
    queryKey: ["/api/cdc-places/states", metric],
    queryFn: () =>
      fetch(`/api/cdc-places/states?metric=${metric}`).then((r) => {
        if (!r.ok) throw new Error("CDC API error");
        return r.json();
      }),
    staleTime: 1000 * 60 * 60 * 12,
    retry: 1,
  });
}

export { metricParamMap };
