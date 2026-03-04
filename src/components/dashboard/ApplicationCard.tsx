import { ExternalLink, Check } from "lucide-react";
import type { Application } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  application: Application;
  onClick: () => void;
}

const statusColors: Record<
  string,
  { bg: string; text: string; dotColor: string }
> = {
  submitted: {
    bg: "bg-green-50",
    text: "text-green-600",
    dotColor: "text-green-500",
  },
  approved: {
    bg: "bg-green-50",
    text: "text-green-600",
    dotColor: "text-green-500",
  },
  rejected: { bg: "bg-red-50", text: "text-red-600", dotColor: "text-red-500" },
  draft: { bg: "bg-gray-50", text: "text-gray-600", dotColor: "text-gray-500" },
  link_generated: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    dotColor: "text-blue-500",
  },
  under_review: {
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    dotColor: "text-yellow-500",
  },
};

export default function ApplicationCard({
  application,
  onClick,
}: ApplicationCardProps) {
  const colors = statusColors[application.status] || statusColors.draft;

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
      onClick={onClick}
    >
      {/* Image header */}
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={application.imageUrl}
          alt={application.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Expand button */}
        <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-sm hover:bg-white transition-colors backdrop-blur-sm">
          <ExternalLink className="h-4 w-4 text-[#0148BA]" />
        </button>
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 rounded-full bg-white/95 text-xs font-medium text-gray-500 backdrop-blur-sm shadow-sm">
            {application.statusLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {application.applicantName}
        </h3>
        <p className="text-sm text-gray-500">
          {application.country} <span className="mx-1.5">•</span>{" "}
          {application.travelDates}
        </p>

        {/* Status / submission row */}
        <div className="mt-4">
          {application.status === "submitted" ||
          application.status === "approved" ? (
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full",
                colors.bg,
              )}
            >
              <Check className={cn("h-4 w-4", colors.dotColor)} />
              <span className={cn("text-sm font-medium", colors.text)}>
                {application.statusLabel}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                {application.submittedAt}
              </span>
            </div>
          ) : (
            <button className="w-full py-3 rounded-xl bg-[#F0F7FF] border border-[#DBEAFE] text-[#1E40AF] text-sm font-medium hover:bg-blue-100 transition-colors">
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
