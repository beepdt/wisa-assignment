import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "All" },
  { id: "generated_links", label: "Generated Links" },
  {
    id: "pending_reviews",
    label: "Pending Reviews",
  },
  { id: "submitted", label: "Submitted" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

export default function FilterTabs({
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all border",
              activeFilter === filter.id
                ? "bg-[#0148BA] text-white border-[#0148BA] shadow-md"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Search className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <SlidersHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
