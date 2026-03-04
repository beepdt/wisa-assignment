import { useState } from "react";
import {
  X,
  ChevronLeft,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronRight,
  MessageCircle,
  Check,
  FileText,
} from "lucide-react";
import type { Document, ValidationItem } from "@/data/mockData";
import ValidationChecklist from "./ValidationChecklist";
import { Button } from "@/components/ui/button";

interface DocumentReviewModalProps {
  document: Document;
  validationItems: ValidationItem[];
  onClose: () => void;
  onBack: () => void;
}

export default function DocumentReviewModal({
  document,
  validationItems,
  onClose,
  onBack,
}: DocumentReviewModalProps) {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <h2 className="text-base font-bold text-gray-900">Documents</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Document preview */}
          <div className="flex-1 border-r border-gray-100 flex flex-col">
            {/* Doc header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900">
                  {document.name}
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                  View details
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Preview area */}
            <div className="flex-1 flex items-center justify-center bg-gray-50/50 p-8 relative">
              {/* Zoom controls */}
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setZoom(Math.max(25, zoom - 25))}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <ZoomOut className="h-4 w-4 text-gray-500" />
                </button>
                <span className="text-xs text-gray-500 px-2 min-w-[40px] text-center">
                  {zoom}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <ZoomIn className="h-4 w-4 text-gray-500" />
                </button>
                <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                  <Maximize2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              {/* Document placeholder */}
              <div className="w-48 h-56 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center bg-white">
                <FileText className="h-12 w-12 text-gray-300 mb-2" />
                <span className="text-xs text-gray-400">Document</span>
                <span className="text-xs text-gray-400">preview</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronLeft className="h-4 w-4" />
                Previous Document
              </button>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-200" />
                ))}
              </div>
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Next Document
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right: Validation */}
          <div className="w-[340px] flex flex-col overflow-y-auto">
            <div className="p-5 flex-1">
              <ValidationChecklist items={validationItems} />
            </div>

            {/* Agent Decision */}
            <div className="p-5 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-900 mb-3">
                Agent Decision
              </h4>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-green-500 text-green-600 hover:bg-green-50 rounded-xl h-10"
                >
                  <MessageCircle className="h-4 w-4 mr-1.5" />
                  Notify Customer
                </Button>
                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl h-10">
                  <Check className="h-4 w-4 mr-1.5" />
                  Approve
                </Button>
              </div>
            </div>

            {/* Create Ticket */}
            <div className="px-5 pb-5 flex justify-end">
              <Button className="bg-[#0148BA] hover:bg-blue-800 text-white text-xs rounded-xl h-9 px-4">
                Create new Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
