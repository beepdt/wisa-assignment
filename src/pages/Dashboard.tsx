import { useState } from "react";
import FilterTabs from "@/components/dashboard/FilterTabs";
import ApplicationCard from "@/components/dashboard/ApplicationCard";
import ApplicationDetailModal from "@/components/dashboard/ApplicationDetailModal";
import { applications, type Application } from "@/data/mockData";

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "submitted") return app.status === "submitted";
    if (activeFilter === "approved") return app.status === "approved";
    if (activeFilter === "rejected") return app.status === "rejected";
    if (activeFilter === "generated_links")
      return app.status === "link_generated";
    if (activeFilter === "pending_reviews")
      return app.status === "under_review";
    return true;
  });

  return (
    <div>
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onClick={() => setSelectedApp(app)}
          />
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No applications found</p>
          <p className="text-sm mt-1">
            Try changing the filter to see more applications
          </p>
        </div>
      )}

      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}
