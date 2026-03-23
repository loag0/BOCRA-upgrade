import { ShieldCheck } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-bocra-surface flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 rounded-xl bg-bocra-gold/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <ShieldCheck className="w-7 h-7 text-bocra-gold" />
        </div>
        <p className="text-bocra-navy font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
}
