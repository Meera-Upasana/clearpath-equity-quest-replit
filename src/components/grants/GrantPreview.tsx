import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { GrantProposalSections } from "@/hooks/useGrantProposal";

interface Props {
  form: {
    hospital: string;
    zip: string;
    program: string;
    amount: number;
    duration: number;
  };
  sections?: GrantProposalSections;
  activeSection?: string | null;
  isStreaming?: boolean;
}

function StreamingText({ text, isActive }: { text: string; isActive: boolean }) {
  if (!text) return null;
  return (
    <span>
      {text}
      {isActive && (
        <span className="inline-block w-0.5 h-3 bg-primary ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

function SectionSkeleton() {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-2.5 w-full" />
      <Skeleton className="h-2.5 w-5/6" />
      <Skeleton className="h-2.5 w-4/5" />
    </div>
  );
}

export function GrantPreview({ form, sections, activeSection, isStreaming }: Props) {
  const isLive = !!sections;

  const renderSection = (key: keyof GrantProposalSections, staticContent: ReactNode) => {
    if (!isLive) return staticContent;
    const text = sections![key];
    const active = activeSection === key;
    if (!text && isStreaming) return <SectionSkeleton />;
    if (!text) return staticContent;
    return (
      <p className="text-xs text-muted-foreground leading-relaxed">
        <StreamingText text={text} isActive={active} />
      </p>
    );
  };

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-2 pt-4 px-5">
        <CardTitle className="text-sm font-medium text-foreground">Grant Proposal Preview</CardTitle>
        <p className="text-xs text-muted-foreground font-mono">{form.program} · ${form.amount.toLocaleString()}</p>
        {isLive && (
          <p className="text-[10px] text-green-400 font-mono flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
            {isStreaming ? "AI writing..." : "AI-generated · Live data"}
          </p>
        )}
      </CardHeader>
      <CardContent className="px-5 pb-6 space-y-5 text-sm leading-relaxed">

        {/* Executive Summary */}
        <section>
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">1. Executive Summary</h3>
          {renderSection("executive_summary",
            <p className="text-xs text-muted-foreground">
              {form.hospital} respectfully requests ${form.amount.toLocaleString()} under the {form.program} to establish a comprehensive community health access point serving ZIP code {form.zip} and surrounding areas. This {form.duration}-month initiative will directly address critical gaps in chronic disease management, preventive care, and health equity for an underserved population of approximately 38,000 residents.
            </p>
          )}
        </section>

        <Separator className="bg-border" />

        {/* Needs Assessment */}
        <section>
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">2. Community Needs Assessment</h3>
          {renderSection("needs_assessment",
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                ZIP code {form.zip} demonstrates a composite health vulnerability score of 87/100, placing it in the top decile of underserved communities nationally. Key indicators:
              </p>
              <div className="border border-border rounded overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="bg-muted"><th className="text-left px-3 py-2 text-muted-foreground font-medium">Metric</th><th className="text-right px-3 py-2 text-muted-foreground font-medium">Value</th><th className="text-right px-3 py-2 text-muted-foreground font-medium">State Avg</th></tr></thead>
                  <tbody>
                    {[["Diabetes rate","17.3%","11.2%"],["Uninsured rate","28.4%","13.5%"],["FQHCs within 10mi","0","2.1"],["Federal awards (24mo)","$0","$1.4M"]].map(([m,v,a]) => (
                      <tr key={m} className="border-t border-border"><td className="px-3 py-2 text-foreground">{m}</td><td className="px-3 py-2 text-right font-mono text-destructive">{v}</td><td className="px-3 py-2 text-right font-mono text-muted-foreground">{a}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <Separator className="bg-border" />

        {/* Patient Impact */}
        <section>
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">3. Patient Impact Projection</h3>
          {renderSection("patient_impact",
            <div className="border border-border rounded overflow-hidden">
              <table className="w-full text-xs">
                <thead><tr className="bg-muted"><th className="text-left px-3 py-2 text-muted-foreground font-medium">Year</th><th className="text-right px-3 py-2 text-muted-foreground font-medium">Patients Served</th><th className="text-right px-3 py-2 text-muted-foreground font-medium">ED Diversions</th></tr></thead>
                <tbody>
                  {[["Year 1","4,200","312"],["Year 2","6,800","520"],["Year 3","9,500","740"]].map(([y,p,e]) => (
                    <tr key={y} className="border-t border-border"><td className="px-3 py-2 text-foreground">{y}</td><td className="px-3 py-2 text-right font-mono text-primary">{p}</td><td className="px-3 py-2 text-right font-mono text-success">{e}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <Separator className="bg-border" />

        {/* ROI Model */}
        <section>
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">4. 5-Year ROI Model</h3>
          {renderSection("roi_model",
            <div className="border border-border rounded overflow-hidden">
              <table className="w-full text-xs">
                <thead><tr className="bg-muted"><th className="text-left px-3 py-2 text-muted-foreground font-medium">Line Item</th><th className="text-right px-3 py-2 text-muted-foreground font-medium">Amount</th></tr></thead>
                <tbody>
                  {[["Grant request",`$${form.amount.toLocaleString()}`],["Annual operating cost","$1,850,000"],["Hospitalization cost avoidance (5yr)","$14,200,000"],["ED diversion savings (5yr)","$3,900,000"],["Net cost avoidance (5yr)","$10,080,000"],["ROI Multiplier","4.2×"]].map(([k,v]) => (
                    <tr key={k} className="border-t border-border"><td className="px-3 py-2 text-foreground">{k}</td><td className="px-3 py-2 text-right font-mono text-primary">{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <Separator className="bg-border" />

        {/* Methodology */}
        <section>
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">5. Data Sources & Methodology</h3>
          {renderSection("methodology",
            <p className="text-xs text-muted-foreground">
              This proposal is informed by CDC PLACES 2023 county- and tract-level estimates, HRSA Data Warehouse FQHC geocoding, USAspending.gov federal award records (healthcare CFDA codes, trailing 24 months), and 2-1-1 United Way referral call-volume data. Composite risk scores are computed as a weighted index of diabetes prevalence (30%), uninsured rate (25%), care access gap (25%), and social distress proxies (20%).
            </p>
          )}
        </section>

      </CardContent>
    </Card>
  );
}
