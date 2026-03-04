import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CustomerLayout from "@/components/layout/CustomerLayout";
import {
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  Building2,
  FileText,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { mockGstData } from "@/data/mockData";

type GstFetchState = "idle" | "loading" | "done" | "error";
type IncomeType = "salary_slips" | "itr";

interface UploadArea {
  file: File | null;
  label: string;
}

function FileUploadZone({
  label,
  hint,
  upload,
  onChange,
}: {
  label: string;
  hint?: string;
  upload: UploadArea;
  onChange: (file: File) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <label
      className={`flex flex-col items-center justify-center min-h-[100px] border-2 border-dashed rounded-xl cursor-pointer transition-all ${
        dragOver
          ? "border-[#0148BA] bg-blue-50"
          : upload.file
            ? "border-green-300 bg-green-50/50"
            : "border-gray-200 bg-gray-50 hover:border-[#0148BA] hover:bg-blue-50/20"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) onChange(file);
      }}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*,.pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
      {upload.file ? (
        <div className="flex items-center gap-2 px-4 py-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-700 truncate max-w-[280px]">
              {upload.file.name}
            </p>
            <p className="text-xs text-green-500">
              {(upload.file.size / 1024).toFixed(0)} KB — uploaded
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-4 px-6 text-center">
          <Upload className="h-6 w-6 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-600">{label}</p>
          {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
        </div>
      )}
    </label>
  );
}

export default function SelfEmployed() {
  const { linkId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // GST Section
  const [gstNumber, setGstNumber] = useState("");
  const [fetchState, setFetchState] = useState<GstFetchState>("idle");
  const [fetchedPan, setFetchedPan] = useState<typeof mockGstData | null>(null);
  const [gstFile, setGstFile] = useState<File | null>(null);

  // Bank Statement
  const [bankFile, setBankFile] = useState<File | null>(null);

  // Income Proof
  const [incomeType, setIncomeType] = useState<IncomeType>("salary_slips");
  const [incomeFile, setIncomeFile] = useState<File | null>(null);

  const passportName = "JOHN MICHAEL SMITH"; // from passport OCR in real app
  const nameMatch =
    fetchedPan?.registeredName.toUpperCase() === passportName.toUpperCase();

  const handleFetchPan = () => {
    if (!gstNumber.trim()) return;
    setFetchState("loading");
    setTimeout(() => {
      setFetchedPan({ ...mockGstData });
      setFetchState("done");
    }, 1500);
  };

  const canSubmit =
    fetchState === "done" && bankFile !== null && incomeFile !== null;

  const handleSubmit = () => {
    navigate(`/apply/${linkId}/done?${searchParams.toString()}`);
  };

  return (
    <CustomerLayout currentStep={1}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Details</h1>
        <p className="text-sm text-gray-500 mt-1">
          Please provide your business and financial documents for the visa
          application.
        </p>
      </div>

      {/* Section 1: GST Details */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-[#0148BA]" />
          </div>
          <h2 className="font-semibold text-gray-900 text-sm">GST Details</h2>
        </div>

        <div className="p-5 space-y-4">
          {/* GST Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              GSTIN
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. 27ABCPS1234D1Z5"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                maxLength={15}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0148BA] transition-all"
              />
              <button
                onClick={handleFetchPan}
                disabled={!gstNumber.trim() || fetchState === "loading"}
                className="px-4 py-2.5 rounded-xl bg-[#0148BA] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-all flex items-center gap-1.5"
              >
                {fetchState === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Fetch PAN"
                )}
              </button>
            </div>
          </div>

          {/* Fetched PAN Result */}
          {fetchState === "done" && fetchedPan && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-0.5">PAN Number</p>
                  <p className="text-sm font-bold text-gray-800 font-mono">
                    {fetchedPan.panNumber}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-0.5">
                    Registered Name
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {fetchedPan.registeredName}
                  </p>
                </div>
              </div>

              {/* Name Match Check */}
              <div
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border ${
                  nameMatch
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                {nameMatch ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                )}
                <div>
                  <p
                    className={`text-sm font-semibold ${nameMatch ? "text-green-700" : "text-red-700"}`}
                  >
                    {nameMatch
                      ? "Name matched with passport"
                      : "Name mismatch with passport"}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${nameMatch ? "text-green-600" : "text-red-600"}`}
                  >
                    {nameMatch
                      ? `GST name matches passport: ${passportName}`
                      : `Passport: ${passportName} · GST: ${fetchedPan.registeredName}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* GST Certificate Upload */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1.5">
              GST Certificate
            </p>
            <FileUploadZone
              label="Upload GST Certificate"
              hint="JPG, PNG or PDF"
              upload={{ file: gstFile, label: "GST Certificate" }}
              onChange={(f) => setGstFile(f)}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Bank Statement */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <FileText className="h-4 w-4 text-[#0148BA]" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">
              Company Bank Statement
            </h2>
            <p className="text-xs text-gray-400">Last 6 months</p>
          </div>
        </div>
        <div className="p-5">
          <FileUploadZone
            label="Upload Bank Statement"
            hint="PDF preferred · Last 6 months"
            upload={{ file: bankFile, label: "Bank Statement" }}
            onChange={(f) => setBankFile(f)}
          />
        </div>
      </section>

      {/* Section 3: Income Proof */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <FileText className="h-4 w-4 text-[#0148BA]" />
          </div>
          <h2 className="font-semibold text-gray-900 text-sm">Income Proof</h2>
        </div>
        <div className="p-5 space-y-4">
          {/* Toggle */}
          <div className="flex gap-2">
            {[
              { id: "salary_slips" as IncomeType, label: "Salary Slips" },
              { id: "itr" as IncomeType, label: "ITR (Income Tax Return)" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setIncomeType(opt.id);
                  setIncomeFile(null);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  incomeType === opt.id
                    ? "bg-[#0148BA] text-white border-[#0148BA] shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <FileUploadZone
            label={
              incomeType === "salary_slips"
                ? "Upload Salary Slips (last 3 months)"
                : "Upload ITR"
            }
            hint="JPG, PNG or PDF"
            upload={{
              file: incomeFile,
              label: incomeType === "salary_slips" ? "Salary Slips" : "ITR",
            }}
            onChange={(f) => setIncomeFile(f)}
          />
        </div>
      </section>

      {/* Submit */}
      {!canSubmit && (
        <div className="flex items-center gap-2 mb-3 px-1">
          <AlertCircle className="h-4 w-4 text-gray-400" />
          <p className="text-xs text-gray-400">
            {fetchState !== "done"
              ? "Please fetch PAN from GSTIN to continue"
              : "Please upload all required documents"}
          </p>
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full py-3.5 rounded-xl bg-[#0148BA] hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
      >
        Submit Application
        <ChevronRight className="h-4 w-4" />
      </button>
    </CustomerLayout>
  );
}
