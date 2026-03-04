import { useState } from "react";
import {
  Globe,
  User,
  Calendar,
  Users,
  Briefcase,
  Link,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";

type EmploymentType = "Salaried" | "Self-Employed" | "Student" | "Retired";
type ApplicantType = "Solo" | "Family" | "Business";

function generateId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "APP-";
  for (let i = 0; i < 6; i++)
    id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export default function GenerateLink() {
  const [form, setForm] = useState({
    customerName: "",
    destinationCountry: "",
    travelDateFrom: "",
    travelDateTo: "",
    applicantType: "Solo" as ApplicantType,
    numberOfPax: 1,
    employmentType: "Salaried" as EmploymentType,
  });
  const [step, setStep] = useState(1);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [generatedId, setGeneratedId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const employmentTypes: EmploymentType[] = [
    "Salaried",
    "Self-Employed",
    "Student",
    "Retired",
  ];
  const applicantTypes: ApplicantType[] = ["Solo", "Family", "Business"];

  const popularLocations = [
    "Dubai, UAE",
    "Paris, France",
    "London, UK",
    "New York, USA",
    "Tokyo, Japan",
    "Singapore",
  ];
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const filteredLocations = popularLocations.filter((loc) =>
    loc.toLowerCase().includes(form.destinationCountry.toLowerCase()),
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.customerName.trim()) newErrors.customerName = "Required";
    if (!form.destinationCountry.trim())
      newErrors.destinationCountry = "Required";
    if (!form.travelDateFrom) newErrors.travelDateFrom = "Required";
    if (!form.travelDateTo) newErrors.travelDateTo = "Required";
    if (
      form.travelDateFrom &&
      form.travelDateTo &&
      form.travelDateTo < form.travelDateFrom
    ) {
      newErrors.travelDateTo = "Return date must be after departure";
    }
    return newErrors;
  };

  const handleGenerate = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const id = generateId();
    setGeneratedId(id);
    const params = new URLSearchParams({
      name: form.customerName,
      country: form.destinationCountry,
      from: form.travelDateFrom,
      to: form.travelDateTo,
      type: form.applicantType,
      pax: String(form.numberOfPax),
      emp: form.employmentType,
    });
    setGeneratedLink(
      `${window.location.origin}/apply/${id}/passport?${params.toString()}`,
    );
    setCopied(false);
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
        : "border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#0148BA]"
    }`;

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Background/Header Mock */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {form.destinationCountry || "Generate Link"}
        </h1>
        <p className="text-sm text-gray-500">Step {step} of 3</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-10">
        {/* Step Indicator */}
        <div className="flex bg-gray-50 border-b border-gray-100">
          {["Location & Applicant", "Travel Dates", "Generate"].map(
            (label, idx) => (
              <div
                key={idx}
                className={`flex-1 py-3 text-center text-xs font-semibold ${step === idx + 1 ? "text-[#0148BA] border-b-2 border-[#0148BA]" : "text-gray-400"}`}
              >
                {idx + 1}. {label}
              </div>
            ),
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* STEP 1: Applicant Details */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in zoom-in-95">
              {/* Destination Country / Location Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Destination Location
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search location (e.g. Dubai)"
                    value={form.destinationCountry}
                    onChange={(e) => {
                      setForm({ ...form, destinationCountry: e.target.value });
                      setShowLocationDropdown(true);
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                    onBlur={() =>
                      setTimeout(() => setShowLocationDropdown(false), 200)
                    }
                    className={`${inputClass("destinationCountry")} pl-10`}
                  />
                  {showLocationDropdown &&
                    form.destinationCountry &&
                    filteredLocations.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                        {filteredLocations.map((loc, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0"
                            onClick={() => {
                              setForm({ ...form, destinationCountry: loc });
                              setShowLocationDropdown(false);
                            }}
                          >
                            {loc}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
                {errors.destinationCountry && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.destinationCountry}
                  </p>
                )}
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Customer Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. John Smith"
                    value={form.customerName}
                    onChange={(e) =>
                      setForm({ ...form, customerName: e.target.value })
                    }
                    className={`${inputClass("customerName")} pl-10`}
                  />
                </div>
                {errors.customerName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.customerName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Applicant Type
                  </label>
                  <div className="flex gap-2">
                    {applicantTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setForm({ ...form, applicantType: t })}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                          form.applicantType === t
                            ? "bg-[#0148BA] text-white border-[#0148BA] shadow-sm"
                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Number of Pax
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={form.numberOfPax}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          numberOfPax: Math.max(
                            1,
                            parseInt(e.target.value) || 1,
                          ),
                        })
                      }
                      className={`${inputClass("")} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Employment Type
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <select
                    value={form.employmentType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        employmentType: e.target.value as EmploymentType,
                      })
                    }
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0148BA] appearance-none transition-all"
                  >
                    {employmentTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Travel Dates */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in zoom-in-95">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={form.travelDateFrom}
                      onChange={(e) =>
                        setForm({ ...form, travelDateFrom: e.target.value })
                      }
                      className={`${inputClass("travelDateFrom")} pl-10`}
                    />
                  </div>
                  {errors.travelDateFrom && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.travelDateFrom}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Return Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={form.travelDateTo}
                      onChange={(e) =>
                        setForm({ ...form, travelDateTo: e.target.value })
                      }
                      className={`${inputClass("travelDateTo")} pl-10`}
                    />
                  </div>
                  {errors.travelDateTo && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.travelDateTo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Generate */}
          {step === 3 && !generatedLink && (
            <div className="animate-in fade-in zoom-in-95 text-center py-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link className="h-8 w-8 text-[#0148BA]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Ready to Generate
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                Customer: <strong>{form.customerName}</strong>
                <br />
                Destination: <strong>{form.destinationCountry}</strong>
              </p>
            </div>
          )}

          {/* Result */}
          {step === 3 && generatedLink && (
            <div className="animate-in fade-in zoom-in-95">
              <div className="bg-green-50 rounded-xl border border-green-200 shadow-sm overflow-hidden text-center py-6 px-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Link Generated Successfully
                </h3>
                <p className="text-sm text-gray-500 mb-6">ID: {generatedId}</p>

                <div className="max-w-md mx-auto">
                  <p className="text-xs text-gray-500 mb-2 font-medium text-left">
                    Share this link with your customer:
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-600 font-mono break-all text-left">
                      {generatedLink}
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium border transition-all ${
                        copied
                          ? "bg-green-600 border-green-600 text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          {step > 1 && step < 4 && !generatedLink && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-all shadow-sm"
            >
              Back
            </button>
          )}

          {step < 3 && (
            <button
              onClick={() => {
                // simple validation before proceeding
                if (
                  step === 1 &&
                  (!form.customerName || !form.destinationCountry)
                ) {
                  setErrors({
                    customerName: !form.customerName ? "Required" : "",
                    destinationCountry: !form.destinationCountry
                      ? "Required"
                      : "",
                  });
                  return;
                }
                if (
                  step === 2 &&
                  (!form.travelDateFrom ||
                    !form.travelDateTo ||
                    form.travelDateTo < form.travelDateFrom)
                ) {
                  setErrors({
                    travelDateFrom: !form.travelDateFrom ? "Required" : "",
                    travelDateTo: !form.travelDateTo
                      ? "Required"
                      : form.travelDateTo < form.travelDateFrom
                        ? "Invalid"
                        : "",
                  });
                  return;
                }
                setErrors({});
                setStep(step + 1);
              }}
              className="w-full py-3 rounded-xl bg-[#0148BA] hover:bg-blue-800 text-white font-semibold text-sm transition-all shadow-sm"
            >
              Continue
            </button>
          )}

          {step === 3 && !generatedLink && (
            <button
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-[#0148BA] hover:bg-blue-800 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Link className="h-4 w-4" />
              Generate Link
            </button>
          )}

          {step === 3 && generatedLink && (
            <button
              onClick={() => {
                setGeneratedLink(null);
                setForm({
                  customerName: "",
                  destinationCountry: "",
                  travelDateFrom: "",
                  travelDateTo: "",
                  applicantType: "Solo",
                  numberOfPax: 1,
                  employmentType: "Salaried",
                });
                setStep(1);
              }}
              className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center"
            >
              Generate Another Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
