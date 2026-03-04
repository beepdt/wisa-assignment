import type { ReactNode } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface CustomerLayoutProps {
  children: ReactNode;
  currentStep?: 0 | 1 | 2; // 0=passport, 1=self-employed, 2=done
}

const steps = [
  { label: "Passport Upload", id: 0 },
  { label: "Financial Details", id: 1 },
  { label: "Done", id: 2 },
];

export default function CustomerLayout({
  children,
  currentStep = 0,
}: CustomerLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0148BA] flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-semibold text-gray-900">Wisa</span>
          </div>

          {/* Step progress */}
          <div className="flex items-center gap-1">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                        isCompleted
                          ? "bg-[#0148BA]"
                          : isActive
                            ? "bg-[#0148BA]"
                            : "bg-gray-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <Circle
                          className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:inline ${
                        isActive
                          ? "text-[#0148BA]"
                          : isCompleted
                            ? "text-[#0148BA]"
                            : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-2 ${
                        index < currentStep ? "bg-[#0148BA]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
