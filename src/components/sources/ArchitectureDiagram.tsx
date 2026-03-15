export function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto">
      {/* Data Sources - Left Column */}
      <rect x="10" y="20" width="160" height="44" rx="4" fill="#111827" stroke="#1F2937" strokeWidth="1" />
      <text x="90" y="46" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontFamily="IBM Plex Sans">CDC PLACES</text>

      <rect x="10" y="90" width="160" height="44" rx="4" fill="#111827" stroke="#1F2937" strokeWidth="1" />
      <text x="90" y="116" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontFamily="IBM Plex Sans">HRSA API</text>

      <rect x="10" y="160" width="160" height="44" rx="4" fill="#111827" stroke="#1F2937" strokeWidth="1" />
      <text x="90" y="186" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontFamily="IBM Plex Sans">USAspending API</text>

      <rect x="10" y="230" width="160" height="44" rx="4" fill="#111827" stroke="#1F2937" strokeWidth="1" />
      <text x="90" y="256" textAnchor="middle" fill="#F9FAFB" fontSize="11" fontFamily="IBM Plex Sans">2-1-1 API</text>

      {/* Processing - Middle Column */}
      <rect x="260" y="40" width="180" height="50" rx="4" fill="#111827" stroke="#00D4B4" strokeWidth="1" />
      <text x="350" y="62" textAnchor="middle" fill="#00D4B4" fontSize="11" fontFamily="IBM Plex Mono">Composite Risk</text>
      <text x="350" y="78" textAnchor="middle" fill="#00D4B4" fontSize="11" fontFamily="IBM Plex Mono">Engine</text>

      <rect x="260" y="120" width="180" height="50" rx="4" fill="#111827" stroke="#00D4B4" strokeWidth="1" />
      <text x="350" y="142" textAnchor="middle" fill="#00D4B4" fontSize="11" fontFamily="IBM Plex Mono">Competitive Intel</text>
      <text x="350" y="158" textAnchor="middle" fill="#00D4B4" fontSize="11" fontFamily="IBM Plex Mono">MCP</text>

      {/* LLM Layer */}
      <rect x="530" y="80" width="160" height="50" rx="4" fill="#111827" stroke="#F59E0B" strokeWidth="1" />
      <text x="610" y="102" textAnchor="middle" fill="#F59E0B" fontSize="11" fontFamily="IBM Plex Mono">LLM Reasoning</text>
      <text x="610" y="118" textAnchor="middle" fill="#F59E0B" fontSize="11" fontFamily="IBM Plex Mono">Layer</text>

      {/* Output */}
      <rect x="610" y="190" width="160" height="50" rx="4" fill="#111827" stroke="#10B981" strokeWidth="1" />
      <text x="690" y="212" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="IBM Plex Mono">Grant Draft</text>
      <text x="690" y="228" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="IBM Plex Mono">Output</text>

      {/* Arrows */}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#9CA3AF" />
        </marker>
      </defs>

      {/* CDC → Risk Engine */}
      <line x1="170" y1="42" x2="256" y2="55" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      {/* 2-1-1 → Risk Engine */}
      <line x1="170" y1="252" x2="260" y2="80" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      {/* HRSA → Competitive Intel */}
      <line x1="170" y1="112" x2="256" y2="135" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      {/* USAspending → Competitive Intel */}
      <line x1="170" y1="182" x2="256" y2="155" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      {/* Risk Engine → LLM */}
      <line x1="440" y1="65" x2="526" y2="95" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      {/* Competitive Intel → LLM */}
      <line x1="440" y1="145" x2="526" y2="115" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      {/* LLM → Output */}
      <line x1="650" y1="130" x2="680" y2="186" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
    </svg>
  );
}
