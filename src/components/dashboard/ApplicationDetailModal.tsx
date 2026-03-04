import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import type { Application, Document } from "@/data/mockData";
import ProgressStepper from "./ProgressStepper";
import DetailsTab from "./DetailsTab";
import DocumentsTab from "./DocumentsTab";
import DocumentReviewModal from "./DocumentReviewModal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ApplicationDetailModalProps {
  application: Application;
  onClose: () => void;
}

type TabId = "details" | "documents" | "awaited";

export default function ApplicationDetailModal({
  application,
  onClose,
}: ApplicationDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>("details");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );

  const tabs: { id: TabId; label: string }[] = [
    { id: "details", label: "Details" },
    { id: "documents", label: "Documents" },
    { id: "awaited", label: "Documents awaited from agent" },
  ];

  if (selectedDocument) {
    return (
      <DocumentReviewModal
        document={selectedDocument}
        validationItems={application.validationItems}
        onClose={onClose}
        onBack={() => setSelectedDocument(null)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header image */}
        <div className="relative h-[160px] flex-shrink-0">
          <img
            src={application.imageUrl}
            alt={application.destination}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-sm backdrop-blur-sm"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Name & info */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {application.applicantName}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Passport No.{" "}
                <span className="text-gray-700 font-medium">
                  {application.passportNo}
                </span>
              </p>
            </div>
            <Button className="bg-[#0148BA] hover:bg-blue-800 text-white text-xs rounded-lg h-8 px-3 gap-1.5">
              <span className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <span className="w-1.5 h-1.5 bg-white rounded-sm" />
                <span className="w-1.5 h-1.5 bg-white rounded-sm" />
                <span className="w-1.5 h-1.5 bg-white rounded-sm" />
                <span className="w-1.5 h-1.5 bg-white rounded-sm" />
              </span>
              Show Required Actions
            </Button>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2 mt-2 mb-4">
            <span className="text-sm text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100">
              {application.statusLabel}
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>

          {/* Progress stepper */}
          <div className="border border-gray-100 rounded-xl mb-6">
            <ProgressStepper currentStep={application.progressStep} />
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-100 mb-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors relative",
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-gray-400 hover:text-gray-600",
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "details" && <DetailsTab application={application} />}
          {activeTab === "documents" && (
            <DocumentsTab
              categories={application.documentCategories}
              onDocumentClick={(doc) => setSelectedDocument(doc)}
            />
          )}
          {activeTab === "awaited" && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No documents awaited from agent
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
