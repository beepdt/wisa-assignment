import { useSearchParams } from "react-router-dom";
import CustomerLayout from "@/components/layout/CustomerLayout";
import { CheckCircle2, Globe, Calendar } from "lucide-react";

export default function ApplicationDone() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "Customer";
  const country = searchParams.get("country") || "your destination";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const formatD = (s: string | null) =>
    s
      ? new Date(s).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <CustomerLayout currentStep={2}>
      <div className="flex flex-col items-center text-center py-8">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h1>
        <p className="text-gray-500 text-sm max-w-sm">
          Thank you, <span className="font-semibold text-gray-700">{name}</span>
          ! Your visa application has been received and is now under review.
        </p>

        {/* Details card */}
        <div className="mt-8 w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left">
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
              Application Summary
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Globe className="h-4 w-4 text-[#0148BA]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Destination</p>
                <p className="text-sm font-semibold text-gray-800">{country}</p>
              </div>
            </div>
            {(from || to) && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-[#0148BA]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Travel Dates</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatD(from)} → {formatD(to)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Our team will review your documents and contact you within 2–3
          business days.
        </p>
      </div>
    </CustomerLayout>
  );
}
