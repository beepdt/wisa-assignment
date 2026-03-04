import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
}

const steps = [
  { label: "Link Generated", timestamp: "04:30 PM | 3-08-2025" },
  { label: "Submitted to Travel agency", timestamp: "" },
  { label: "Submitted to Wiza", timestamp: "" },
  { label: "Under Review", timestamp: "" },
];

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  return (
    <div className="flex items-start justify-between py-6 px-4">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className="flex flex-col items-center flex-1 relative"
        >
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "absolute top-4 left-[calc(50%+16px)] right-[calc(-50%+16px)] h-[2px]",
                index < currentStep ? "bg-[#0148BA]" : "bg-gray-200",
              )}
            />
          )}
          {/* Circle */}
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors",
              index <= currentStep
                ? "bg-[#0148BA] text-white"
                : "bg-white border-2 border-gray-200 text-gray-300",
            )}
          >
            {index <= currentStep ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-gray-200" />
            )}
          </div>
          {/* Label */}
          <span
            className={cn(
              "text-xs mt-2 text-center max-w-[100px]",
              index <= currentStep
                ? "text-[#0148BA] font-medium"
                : "text-gray-400",
            )}
          >
            {step.label}
          </span>
          {/* Timestamp */}
          {index <= currentStep && step.timestamp && (
            <span className="text-[10px] text-gray-400 mt-0.5">
              {step.timestamp}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
