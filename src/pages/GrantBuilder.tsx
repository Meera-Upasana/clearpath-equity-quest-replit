import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { GrantPreview } from "@/components/grants/GrantPreview";
import { FileText, Copy, Mail, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGrantProposal } from "@/hooks/useGrantProposal";

export default function GrantBuilder() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    hospital: "Mercy General Medical Center",
    zip: "85035",
    program: "HRSA Community Health Centers Fund",
    amount: 2400000,
    duration: 36,
  });

  const { sections, activeSection, isStreaming, isDone, error, generate, reset } = useGrantProposal();
  const hasContent = Object.values(sections).some((v) => v.length > 0);

  const handleGenerate = () => {
    if (!/^\d{5}$/.test(form.zip)) {
      toast({ title: "Invalid ZIP code", description: "Please enter a valid 5-digit ZIP code.", variant: "destructive" });
      return;
    }
    reset();

    toast({ title: "Fetching live data...", description: "Pulling from CDC PLACES, HRSA, and USAspending.gov..." });

    setTimeout(() => {
      if (isStreaming) {
        toast({ title: "Sending to AI writer...", description: "Claude is generating your proposal..." });
      }
    }, 3000);

    generate({
      hospital_name: form.hospital,
      target_zip: form.zip,
      grant_program: form.program,
      amount: form.amount,
      duration_months: form.duration,
    });
  };

  useEffect(() => {
    if (isDone) {
      toast({ title: "Proposal complete", description: "Your grant proposal has been generated." });
    }
  }, [isDone]);

  useEffect(() => {
    if (error) {
      toast({ title: "Generation error", description: error, variant: "destructive" });
    }
  }, [error]);

  const handleCopy = () => {
    const text = Object.entries(sections)
      .filter(([, v]) => v)
      .map(([k, v]) => `## ${k.replace(/_/g, " ").toUpperCase()}\n\n${v}`)
      .join("\n\n---\n\n");
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: "Grant proposal text copied." });
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <h1 className="text-lg font-semibold text-foreground">Grant Proposal Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: Config form */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-sm font-medium">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Hospital Name</Label>
                <Input
                  data-testid="input-hospital-name"
                  value={form.hospital}
                  onChange={(e) => setForm({ ...form, hospital: e.target.value })}
                  className="bg-muted border-border text-sm"
                  disabled={isStreaming}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Target ZIP Code</Label>
                <Input
                  data-testid="input-target-zip"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className="bg-muted border-border text-sm font-mono"
                  maxLength={5}
                  disabled={isStreaming}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Grant Program</Label>
                <Select
                  value={form.program}
                  onValueChange={(v) => setForm({ ...form, program: v })}
                  disabled={isStreaming}
                >
                  <SelectTrigger className="bg-muted border-border text-sm" data-testid="select-grant-program">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HRSA Community Health Centers Fund">HRSA Community Health Centers Fund</SelectItem>
                    <SelectItem value="CDC Chronic Disease Prevention">CDC Chronic Disease Prevention</SelectItem>
                    <SelectItem value="CMS Innovation">CMS Innovation</SelectItem>
                    <SelectItem value="FEMA Health Resilience">FEMA Health Resilience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Requested Amount: ${form.amount.toLocaleString()}
                </Label>
                <Input
                  data-testid="input-amount"
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  className="bg-muted border-border text-sm font-mono"
                  disabled={isStreaming}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Project Duration: {form.duration} months
                </Label>
                <Slider
                  data-testid="slider-duration"
                  value={[form.duration]}
                  onValueChange={([v]) => setForm({ ...form, duration: v })}
                  min={12}
                  max={60}
                  step={6}
                  className="w-full"
                  disabled={isStreaming}
                />
              </div>

              <Button
                data-testid="button-generate-proposal"
                className="w-full gap-2"
                onClick={handleGenerate}
                disabled={isStreaming}
              >
                {isStreaming ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
                ) : (
                  <><Sparkles className="h-4 w-4" />Generate with AI</>
                )}
              </Button>

              <div className="flex gap-2">
                <Button
                  data-testid="button-copy-proposal"
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs gap-1.5"
                  onClick={handleCopy}
                  disabled={!hasContent}
                >
                  <Copy className="h-3.5 w-3.5" />Copy
                </Button>
                <Button
                  data-testid="button-email-proposal"
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs gap-1.5"
                  disabled={!hasContent}
                >
                  <Mail className="h-3.5 w-3.5" />Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-3">
          <GrantPreview
            form={form}
            sections={hasContent ? sections : undefined}
            activeSection={activeSection}
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </div>
  );
}
