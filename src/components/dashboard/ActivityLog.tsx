import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  entries: string[];
  isLoading: boolean;
}

export function ActivityLog({ entries, isLoading }: Props) {
  return (
    <div className="bg-card border border-border rounded overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
        <span className="text-xs font-medium text-foreground">AI Agent Activity Log</span>
      </div>
      <div className="p-4 max-h-48 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full rounded" />
            ))}
          </div>
        ) : (
          <div className="font-mono text-xs leading-6 text-primary space-y-0.5">
            {entries.map((line, i) => (
              <div key={i} data-testid={`log-entry-${i}`}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
