import { CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ValidationItem } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ValidationChecklistProps {
  items: ValidationItem[];
}

export default function ValidationChecklist({
  items,
}: ValidationChecklistProps) {
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-base font-bold text-gray-900 mb-1">
        Document Validation
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        We're reviewing your document to ensure it meets all requirements.
      </p>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label}>
            <div
              className={cn(
                "flex items-center justify-between p-3.5 rounded-xl border transition-colors",
                item.status === "manual_check"
                  ? "border-red-100 bg-red-50/50"
                  : "border-gray-100 bg-white",
              )}
            >
              <div className="flex items-center gap-2.5">
                {item.status === "validated" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : item.status === "manual_check" ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                )}
                <span className="text-sm text-gray-700 font-medium">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs font-semibold",
                    item.status === "validated"
                      ? "text-green-600"
                      : item.status === "manual_check"
                        ? "text-red-600"
                        : "text-gray-400",
                  )}
                >
                  {item.status === "validated"
                    ? "Validated"
                    : item.status === "manual_check"
                      ? "Manual Check Req."
                      : "Pending"}
                </span>
                {item.note && (
                  <button
                    onClick={() =>
                      setExpandedNote(
                        expandedNote === item.label ? null : item.label,
                      )
                    }
                    className="p-0.5 rounded hover:bg-red-100 transition-colors"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-red-400 transition-transform",
                        expandedNote === item.label && "rotate-180",
                      )}
                    />
                  </button>
                )}
              </div>
            </div>
            {item.note && expandedNote === item.label && (
              <div className="mx-3 mt-1 mb-2 p-3 rounded-lg bg-red-50/80 border border-red-100">
                <p className="text-xs font-semibold text-gray-600 mb-1">
                  Reviewer's Note:
                </p>
                <p className="text-xs text-gray-500 whitespace-pre-line">
                  {item.note}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
