import { useState } from "react";
import { CheckCircle2, Copy, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types & Metadata ---
type ModalStep = "hidden" | "select_visa" | "add_markup" | "share_link";

const VISA_TYPES = [
  {
    id: "tourist_30",
    title: "Tourist",
    price: 4500,
    entry: "Single",
    processingTime: "5 Days",
    duration: "60 Days",
    validity: "30 Days",
    recommended: true,
  },
  {
    id: "tourist_60",
    title: "Tourist",
    price: 5500,
    entry: "Single",
    processingTime: "5 Days",
    duration: "60 Days",
    validity: "30 Days",
    recommended: false,
  },
  {
    id: "tourist_90",
    title: "Tourist",
    price: 6000,
    entry: "Single",
    processingTime: "5 Days",
    duration: "60 Days",
    validity: "30 Days",
    recommended: false,
  },
];

export default function DestinationPage() {
  const [modalStep, setModalStep] = useState<ModalStep>("hidden");

  // State for flow
  const [selectedVisa, setSelectedVisa] = useState<string>("tourist_30");
  const [markupType, setMarkupType] = useState<"amount" | "percentage">(
    "percentage",
  );
  const [markupValue, setMarkupValue] = useState<number>(15);
  const [copied, setCopied] = useState(false);

  const generatedLink = "www.wizafortravel.com/apply/dubai-12345";

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 relative">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] w-full">
        {/* Background Image overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
          alt="Dubai Skyline"
          className="w-full h-full object-cover"
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
          <h1 className="text-6xl sm:text-8xl font-bold text-white/90 tracking-tight drop-shadow-lg mb-8">
            Dubai
          </h1>

          {/* Stats Bar */}
          <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700 shadow-sm max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-medium">12,000+ visas processed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-medium">98% approval rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-medium">24/7 support</span>
            </div>
            <div className="w-px h-6 bg-gray-300 hidden sm:block mx-2" />
            <div className="flex items-center gap-2 text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] leading-tight">Last updated</span>
                <span className="font-medium text-gray-800 leading-tight">
                  9th Sept 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Info & Timeline) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visa Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Visa Information
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Visa Type</p>
                  <p className="font-medium text-gray-900">Tourist</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Length of stay</p>
                  <p className="font-medium text-gray-900">30 Days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Validity</p>
                  <p className="font-medium text-gray-900">60 Days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Entry</p>
                  <p className="font-medium text-gray-900">Single Entry</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Method</p>
                  <p className="font-medium text-[#014BA9]">E-Visa (Online)</p>
                </div>
              </div>
            </div>

            {/* Visa Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-8">
                Visa Timeline
              </h2>

              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-4 left-0 w-full h-[3px] bg-gray-100 rounded-full" />
                <div className="absolute top-4 left-0 w-1/3 h-[3px] bg-[#F97316] rounded-full" />

                <div className="flex justify-between relative mt-2 text-center text-sm font-medium">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center border-4 border-white shadow-sm absolute -top-10">
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>
                    <span className="text-gray-900">Today</span>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-sm absolute -top-10" />
                    <span className="text-gray-500">Processed</span>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-sm absolute -top-10" />
                    <span className="text-gray-500">Govt. Site</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Pricing & Action) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBF4FE] sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Price Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Embassy Fee</span>
                  <span className="font-medium">₹ 3,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Wiza Fee</span>
                  <span className="font-medium">₹ 1,000</span>
                </div>
                <div className="h-px w-full bg-gray-100" />
                <div className="flex justify-between items-end">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#014BA9]">₹ 4,500</p>
                    <p className="text-xs text-gray-500 font-medium">
                      per person
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setModalStep("select_visa")}
                className="w-full py-4 px-6 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-lg shadow-sm transition-colors"
              >
                Generate Link
              </button>

              <div className="mt-4 text-center">
                <button className="text-[#014BA9] text-sm font-medium hover:underline">
                  Need Help? Read FAQ&apos;s
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal Overlays --- */}

      {modalStep !== "hidden" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {modalStep === "select_visa" && "- Choose required visa type"}
                {modalStep === "add_markup" && "Generate Link"}
                {modalStep === "share_link" && "Share link"}
              </h2>
              <button
                onClick={() => setModalStep("hidden")}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto min-h-[400px]">
              {/* STEP 1: SELECT VISA */}
              {modalStep === "select_visa" && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {VISA_TYPES.map((visa) => (
                      <button
                        key={visa.id}
                        onClick={() => {
                          setSelectedVisa(visa.id);
                          setModalStep("add_markup");
                        }}
                        className={cn(
                          "text-left bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#014BA9] hover:shadow-md transition-all relative block w-full",
                          selectedVisa === visa.id &&
                            "border-2 border-[#014BA9] shadow-sm",
                        )}
                      >
                        {visa.recommended && (
                          <div className="bg-[#F97316] text-white text-[10px] font-bold text-center py-1 uppercase tracking-wider">
                            RECOMMENDED
                          </div>
                        )}
                        <div className="relative h-24 bg-gray-900">
                          <img
                            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                            alt="Dubai"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-white font-bold text-2xl drop-shadow-md">
                              Dubai
                            </h3>
                          </div>
                          <div className="absolute -bottom-3 left-4 flex gap-2 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                            <span className="text-xs font-bold text-gray-900">
                              {visa.title}
                            </span>
                            <span className="text-xs font-bold text-[#014BA9]">
                              ₹{visa.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 pt-6 bg-white space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex flex-col">
                              <span className="font-bold text-[#014BA9]">
                                {visa.entry}
                              </span>
                              <span className="text-gray-400 text-xs">
                                Entry
                              </span>
                            </div>
                            <div className="flex flex-col text-right">
                              <span className="font-bold text-[#014BA9]">
                                {visa.processingTime}
                              </span>
                              <span className="text-gray-400 text-xs">
                                Processing Time
                              </span>
                            </div>
                          </div>
                          <div className="h-px bg-gray-100 w-full" />
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex flex-col">
                              <span className="font-bold text-[#014BA9]">
                                {visa.duration}
                              </span>
                              <span className="text-gray-400 text-xs">
                                Duration
                              </span>
                            </div>
                            <div className="flex flex-col text-right">
                              <span className="font-bold text-[#014BA9]">
                                {visa.validity}
                              </span>
                              <span className="text-gray-400 text-xs">
                                Validity
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: ADD MARKUP */}
              {modalStep === "add_markup" && (
                <div className="p-8 flex flex-col items-center justify-center h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-8">
                    Add Markup
                  </h3>

                  {/* Toggle */}
                  <div className="bg-gray-100 p-1.5 rounded-full flex gap-1 mb-10 w-full max-w-sm">
                    <button
                      className={cn(
                        "flex-1 py-3 text-sm font-medium rounded-full transition-colors",
                        markupType === "amount"
                          ? "bg-white shadow-sm text-gray-900"
                          : "text-gray-500",
                      )}
                      onClick={() => {
                        setMarkupType("amount");
                        setMarkupValue(500);
                      }}
                    >
                      Amount
                    </button>
                    <button
                      className={cn(
                        "flex-1 py-3 text-sm font-medium rounded-full transition-colors",
                        markupType === "percentage"
                          ? "bg-[#FFC107] text-gray-900 shadow-sm"
                          : "text-gray-500",
                      )}
                      onClick={() => {
                        setMarkupType("percentage");
                        setMarkupValue(15);
                      }}
                    >
                      Percentage
                    </button>
                  </div>

                  {/* Input */}
                  <div className="flex items-end justify-center gap-2 mb-10 border-b-2 border-gray-200 pb-2 min-w-[200px]">
                    {markupType === "amount" && (
                      <span className="text-4xl text-gray-900">₹</span>
                    )}
                    <input
                      type="number"
                      value={markupValue}
                      onChange={(e) => setMarkupValue(Number(e.target.value))}
                      className="text-5xl font-medium text-gray-900 bg-transparent text-center focus:outline-none w-24"
                    />
                    {markupType === "percentage" && (
                      <span className="text-5xl text-gray-900">%</span>
                    )}
                  </div>

                  {/* Presets */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                    {markupType === "percentage" ? (
                      <>
                        <button
                          onClick={() => setMarkupValue(10)}
                          className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium text-gray-600 transition-all"
                        >
                          +10%
                        </button>
                        <button
                          onClick={() => setMarkupValue(15)}
                          className="px-6 py-2.5 rounded-xl border-2 border-[#014BA9] bg-blue-50 font-bold text-[#014BA9] transition-all"
                        >
                          +15%
                        </button>
                        <button
                          onClick={() => setMarkupValue(20)}
                          className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium text-gray-600 transition-all"
                        >
                          +20%
                        </button>
                        <button
                          onClick={() => setMarkupValue(25)}
                          className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium text-gray-600 transition-all"
                        >
                          +25%
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setMarkupValue(500)}
                          className="px-6 py-2.5 rounded-xl border-2 border-[#014BA9] bg-blue-50 font-bold text-[#014BA9] transition-all"
                        >
                          ₹500
                        </button>
                        <button
                          onClick={() => setMarkupValue(1000)}
                          className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium text-gray-600 transition-all"
                        >
                          ₹1,000
                        </button>
                        <button
                          onClick={() => setMarkupValue(2000)}
                          className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium text-gray-600 transition-all"
                        >
                          ₹2,000
                        </button>
                        <button
                          onClick={() => setMarkupValue(5000)}
                          className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium text-gray-600 transition-all"
                        >
                          ₹5,000
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => setModalStep("share_link")}
                    className="w-full max-w-sm py-4 rounded-full bg-[#014BA9] hover:bg-blue-800 text-white font-bold text-lg shadow-md transition-colors mt-auto"
                  >
                    Generate Link
                  </button>
                </div>
              )}

              {/* STEP 3: SHARE LINK */}
              {modalStep === "share_link" && (
                <div className="p-8 flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <LinkIcon className="h-8 w-8 text-[#014BA9]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Link Generated Successfully!
                  </h3>
                  <p className="text-gray-500 mb-10 text-center max-w-sm">
                    You can easily copy this link and send it to your client, or
                    share it directly via WhatsApp.
                  </p>

                  {/* Link Box */}
                  <div className="w-full max-w-md bg-gray-50 rounded-2xl p-4 border border-gray-200 flex items-center justify-between gap-4 mb-8">
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {generatedLink}
                    </span>
                    <button
                      onClick={handleCopy}
                      title="Copy to clipboard"
                      className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors shrink-0"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      window.open(
                        `https://wa.me/?text=Hi! Please use this link to complete your visa application: ${generatedLink}`,
                        "_blank",
                      );
                    }}
                    className="w-full max-w-md py-4 flex items-center justify-center gap-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold shadow-md transition-colors"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 0C5.385 0 0 5.386 0 12.035c0 2.25.59 4.393 1.636 6.28L.15 24l5.882-1.545A11.968 11.968 0 0 0 12.031 24c6.643 0 12.031-5.388 12.031-12.035C24.062 5.386 18.674 0 12.031 0zm0 22.012c-1.895 0-3.69-.49-5.305-1.42l-.38-.217-3.945 1.036 1.05-3.847-.237-.378a9.98 9.98 0 0 1-1.526-5.31C1.69 5.419 7.086 0 12.031 0c4.943 0 10.038 5.421 10.038 12.035 0 6.61-5.093 11.977-10.038 11.977zm5.545-8.06c-.302-.152-1.78-.88-2.057-.98-.277-.101-.48-.152-.683.152-.203.303-.78 1.026-.957 1.233-.178.204-.356.228-.66.076-.84-.42-1.849-.963-2.639-1.92-.615-.745-1.04-1.554-1.163-1.758-.124-.204-.012-.315.138-.468.135-.138.303-.356.455-.534.152-.178.203-.306.304-.51.101-.205.05-.383-.025-.536-.076-.153-.683-1.646-.935-2.254-.246-.59-.495-.51-.683-.52-.178-.01-.38-.013-.583-.013s-.534.076-.814.382c-.28.305-1.066 1.041-1.066 2.536 0 1.494 1.092 2.937 1.244 3.14 0 0 2.193 3.344 5.312 4.708.745.326 1.328.521 1.782.667.747.237 1.43.203 1.968.123.6-.089 1.78-.727 2.032-1.431.253-.706.253-1.309.178-1.436-.076-.128-.28-.204-.582-.358z" />
                    </svg>
                    Share on WhatsApp
                  </button>

                  <button
                    onClick={() => setModalStep("hidden")}
                    className="mt-6 font-medium text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
