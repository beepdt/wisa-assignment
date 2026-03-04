import type { Application } from "@/data/mockData";

interface DetailsTabProps {
  application: Application;
}

export default function DetailsTab({ application }: DetailsTabProps) {
  const details = [
    { label: "Destination", value: application.destination },
    { label: "Travel Dates", value: application.travelDates },
    { label: "Type", value: application.type },
    { label: "No. of Pax", value: application.pax.toString() },
    { label: "Application ID", value: application.applicationId },
  ];

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      {details.map((detail, index) => (
        <div
          key={detail.label}
          className={`flex items-center py-3.5 px-5 ${
            index < details.length - 1 ? "border-b border-gray-50" : ""
          }`}
        >
          <span className="text-sm font-medium text-gray-900 w-[180px]">
            {detail.label}
          </span>
          <span className="text-sm text-gray-500">{detail.value}</span>
        </div>
      ))}
    </div>
  );
}
