import { useState, useCallback } from "react";

export interface GrantProposalSections {
  executive_summary: string;
  needs_assessment: string;
  patient_impact: string;
  roi_model: string;
  methodology: string;
}

export interface UseGrantProposalReturn {
  sections: GrantProposalSections;
  rawText: string;
  activeSection: string | null;
  isStreaming: boolean;
  isDone: boolean;
  error: string | null;
  generate: (params: {
    hospital_name: string;
    target_zip: string;
    grant_program: string;
    amount: number;
    duration_months: number;
  }) => void;
  reset: () => void;
}

const EMPTY: GrantProposalSections = {
  executive_summary: "",
  needs_assessment: "",
  patient_impact: "",
  roi_model: "",
  methodology: "",
};

const SECTION_HEADERS: Record<string, keyof GrantProposalSections> = {
  "EXECUTIVE SUMMARY": "executive_summary",
  "NEEDS ASSESSMENT & GAP ANALYSIS": "needs_assessment",
  "NEEDS ASSESSMENT": "needs_assessment",
  "PROJECTED PATIENT IMPACT": "patient_impact",
  "PATIENT IMPACT": "patient_impact",
  "5-YEAR ROI MODEL": "roi_model",
  "ROI MODEL": "roi_model",
  "DATA SOURCES & METHODOLOGY": "methodology",
  "METHODOLOGY": "methodology",
};

function parseSections(text: string): GrantProposalSections {
  const result = { ...EMPTY };
  const headerPattern = /^##\s+(.+)$/gm;
  const matches: { header: string; index: number }[] = [];

  let match;
  while ((match = headerPattern.exec(text)) !== null) {
    matches.push({ header: match[1].trim(), index: match.index });
  }

  for (let i = 0; i < matches.length; i++) {
    const { header, index } = matches[i];
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    const body = text.slice(index, end).replace(/^##\s+.+\n?/, "").trim();

    const key = SECTION_HEADERS[header.toUpperCase()] ||
      Object.entries(SECTION_HEADERS).find(([h]) => header.toUpperCase().includes(h))?.[1];

    if (key && body) {
      result[key] = body;
    }
  }

  return result;
}

function getActiveSection(text: string): string | null {
  const headerPattern = /^##\s+(.+)$/gm;
  let last: string | null = null;
  let match;
  while ((match = headerPattern.exec(text)) !== null) {
    const key = SECTION_HEADERS[match[1].trim().toUpperCase()] ||
      Object.entries(SECTION_HEADERS).find(([h]) => match[1].trim().toUpperCase().includes(h))?.[1];
    if (key) last = key;
  }
  return last;
}

export function useGrantProposal(): UseGrantProposalReturn {
  const [sections, setSections] = useState<GrantProposalSections>(EMPTY);
  const [rawText, setRawText] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setSections(EMPTY);
    setRawText("");
    setActiveSection(null);
    setIsStreaming(false);
    setIsDone(false);
    setError(null);
  }, []);

  const generate = useCallback(
    (params: {
      hospital_name: string;
      target_zip: string;
      grant_program: string;
      amount: number;
      duration_months: number;
    }) => {
      reset();
      setIsStreaming(true);

      fetch("/api/grant-proposal/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Server error");
          const reader = res.body?.getReader();
          if (!reader) throw new Error("No stream");

          const decoder = new TextDecoder();
          let buffer = "";
          let accumulated = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              try {
                const payload = JSON.parse(line.slice(6));
                if (payload.done) {
                  setIsStreaming(false);
                  setIsDone(true);
                  setActiveSection(null);
                  const finalSections = parseSections(accumulated);
                  setSections(finalSections);
                } else if (payload.delta != null) {
                  accumulated += payload.delta;
                  setRawText(accumulated);
                  const parsed = parseSections(accumulated);
                  setSections(parsed);
                  setActiveSection(getActiveSection(accumulated));
                }
              } catch {
                // malformed SSE line
              }
            }
          }
        })
        .catch((err) => {
          setError(err.message || "Generation failed");
          setIsStreaming(false);
        });
    },
    [reset]
  );

  return { sections, rawText, activeSection, isStreaming, isDone, error, generate, reset };
}
