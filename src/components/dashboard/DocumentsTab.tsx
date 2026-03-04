import {
  ChevronRight,
  User,
  CircleDollarSign,
  Plane,
  FileText,
  CreditCard,
  Image,
  File,
} from "lucide-react";
import type { DocumentCategory, Document } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface DocumentsTabProps {
  categories: DocumentCategory[];
  onDocumentClick: (doc: Document) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  user: User,
  "circle-dollar-sign": CircleDollarSign,
  plane: Plane,
  "file-text": FileText,
};

const docTypeIcons: Record<string, React.ElementType> = {
  passport: CreditCard,
  id_card: CreditCard,
  bank_statement: CreditCard,
  itinerary: File,
  flight: Plane,
  photo: Image,
  other: FileText,
};

function DocumentCard({
  doc,
  onClick,
}: {
  doc: Document;
  onClick: () => void;
}) {
  const DocIcon = docTypeIcons[doc.type] || FileText;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50/50 transition-all text-left w-full group"
    >
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <DocIcon className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
        <p className="text-xs text-gray-400 truncate">{doc.description}</p>
      </div>
      <span
        className={cn(
          "text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0",
          doc.status === "validated"
            ? "bg-green-50 text-green-600"
            : doc.status === "review_required"
              ? "bg-red-50 text-red-600"
              : "bg-gray-50 text-gray-500",
        )}
      >
        {doc.status === "validated"
          ? "Validated"
          : doc.status === "review_required"
            ? "Review Required"
            : "Pending"}
      </span>
      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 flex-shrink-0" />
    </button>
  );
}

export default function DocumentsTab({
  categories,
  onDocumentClick,
}: DocumentsTabProps) {
  return (
    <div className="space-y-5">
      {categories.map((category) => {
        const CategoryIcon = categoryIcons[category.icon] || FileText;
        return (
          <div key={category.title} className="bg-gray-50/70 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                <CategoryIcon className="h-4 w-4 text-gray-500" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">
                {category.title}
              </h4>
            </div>
            {category.documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    doc={doc}
                    onClick={() => onDocumentClick(doc)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 pl-12">
                No documents uploaded yet
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
