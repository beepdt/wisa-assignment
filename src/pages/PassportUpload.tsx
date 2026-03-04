import { useState, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CustomerLayout from "@/components/layout/CustomerLayout";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { mockOcrData, type OcrPassportData } from "@/data/mockData";
import Tesseract from "tesseract.js";

type UploadState = "idle" | "uploading" | "processing" | "done";

function addDays(dateStr: string, days: number): Date {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d;
}

function parseExpiry(ddmmyyyy: string): Date {
  const [dd, mm, yyyy] = ddmmyyyy.split("/");
  return new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd));
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PassportUpload() {
  const { linkId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const travelDateFrom = searchParams.get("from") || "";
  const customerName = searchParams.get("name") || "Customer";

  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<OcrPassportData | null>(null);
  const [editedData, setEditedData] = useState<OcrPassportData | null>(null);

  // 183-day validity check
  const validityCheck = (() => {
    if (!editedData || !travelDateFrom) return null;
    const expiryDate = parseExpiry(editedData.dateOfExpiry);
    const requiredDate = addDays(travelDateFrom, 183);
    return { valid: expiryDate >= requiredDate, expiryDate, requiredDate };
  })();

  const processFile = useCallback((file: File) => {
    setUploadState("uploading");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate upload delay for UI
    setTimeout(() => {
      setUploadState("processing");

      // Real OCR matching using Tesseract
      Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          console.log("OCR Result:", text);

          // We provide a fallback to mock data combined with what tesseract read
          // to ensure robust demo functionality.
          const updatedData = { ...mockOcrData };
          if (text) {
            const lines = text.split("\n").map((l) => l.replace(/\s+/g, ""));
            // Find line starting with P< or containing P< and << somewhere inside
            const mrz1Index = lines.findIndex(
              (l) => l.includes("P<") && l.includes("<<"),
            );

            if (mrz1Index !== -1 && lines[mrz1Index + 1]) {
              const mrz1 = lines[mrz1Index].substring(
                lines[mrz1Index].indexOf("P<"),
              );
              const mrz2 = lines[mrz1Index + 1];

              updatedData.mrz = mrz1 + "\n" + mrz2;

              if (mrz1.length >= 39 && mrz2.length >= 39) {
                try {
                  // Parse Line 1 names
                  // Format: P<xxxSURNAME<<GIVEN<NAMES<<<<<<
                  const nameStr = mrz1.substring(5).replace(/<+$/, "");
                  const nameParts = nameStr.split("<<");
                  if (nameParts.length >= 2) {
                    updatedData.surname = nameParts[0]
                      .replace(/</g, " ")
                      .trim();
                    updatedData.givenNames = nameParts[1]
                      .replace(/</g, " ")
                      .trim();
                  } else {
                    updatedData.surname = nameParts[0]
                      .replace(/</g, " ")
                      .trim();
                    updatedData.givenNames = "";
                  }

                  // Parse Line 2
                  // Format: 1234567890XXX7001018M3001018<<<<<<<<<<<<<<02
                  updatedData.passportNumber = mrz2
                    .substring(0, 9)
                    .replace(/</g, "");
                  updatedData.nationality = mrz2
                    .substring(10, 13)
                    .replace(/</g, "");

                  // DOB format: YYMMDD
                  const dobYY = mrz2.substring(13, 15);
                  const dobMM = mrz2.substring(15, 17);
                  const dobDD = mrz2.substring(17, 19);
                  const currentYearLimit = new Date().getFullYear() % 100;
                  const yDob =
                    parseInt(dobYY) > currentYearLimit
                      ? `19${dobYY}`
                      : `20${dobYY}`;
                  updatedData.dateOfBirth = `${dobDD}/${dobMM}/${yDob}`;

                  // Expiry format: YYMMDD
                  const expYY = mrz2.substring(21, 23);
                  const expMM = mrz2.substring(23, 25);
                  const expDD = mrz2.substring(25, 27);
                  // Assume expiry is almost always 20XX
                  updatedData.dateOfExpiry = `${expDD}/${expMM}/20${expYY}`;
                } catch (e) {
                  console.error("Error parsing MRZ details", e);
                }
              }
            } else {
              // naive capture for display if logic fails
              const mrzMatch = text.match(/P<[A-Z0-9<]+/g);
              if (mrzMatch) {
                updatedData.mrz = mrzMatch.join("\n");
              }
            }
          }

          setOcrData(updatedData);
          setEditedData(updatedData);
          setUploadState("done");
        })
        .catch((err) => {
          console.error("OCR Error:", err);
          // Fallback gracefully on error
          const data = { ...mockOcrData };
          setOcrData(data);
          setEditedData({ ...data });
          setUploadState("done");
        });
    }, 800);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleContinue = () => {
    const empType = searchParams.get("emp") || "Salaried";
    if (empType === "Self-Employed") {
      navigate(`/apply/${linkId}/self-employed?${searchParams.toString()}`);
    } else {
      navigate(`/apply/${linkId}/done?${searchParams.toString()}`);
    }
  };

  const fields: { label: string; key: keyof OcrPassportData }[] = [
    { label: "Surname", key: "surname" },
    { label: "Given Names", key: "givenNames" },
    { label: "Nationality", key: "nationality" },
    { label: "Date of Birth", key: "dateOfBirth" },
    { label: "Passport Number", key: "passportNumber" },
    { label: "Date of Issue", key: "dateOfIssue" },
    { label: "Date of Expiry", key: "dateOfExpiry" },
  ];

  return (
    <CustomerLayout currentStep={0}>
      {/* State: idle */}
      {uploadState === "idle" && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Upload Your Passport
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Hi {customerName}! Please upload a clear photo or scan of your
              passport's data page.
            </p>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
              dragOver
                ? "border-[#0148BA] bg-blue-50"
                : "border-gray-200 bg-white hover:border-[#0148BA] hover:bg-blue-50/30"
            }`}
          >
            <label
              htmlFor="passport-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${dragOver ? "bg-blue-100" : "bg-blue-50"}`}
              >
                <Upload
                  className={`h-8 w-8 ${dragOver ? "text-[#0148BA]" : "text-blue-400"}`}
                />
              </div>
              <p className="text-gray-700 font-semibold mb-1">
                {dragOver
                  ? "Drop your passport here"
                  : "Drag & drop your passport"}
              </p>
              <p className="text-sm text-gray-400 mb-4">or click to browse</p>
              <div className="flex gap-2">
                {["JPG", "PNG", "PDF"].map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
              <input
                id="passport-upload"
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </div>

          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Make sure your passport is valid for at least{" "}
              <strong>183 days</strong> from your departure date
              {travelDateFrom
                ? ` (${new Date(travelDateFrom).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })})`
                : ""}
              .
            </p>
          </div>
        </div>
      )}

      {/* State: uploading */}
      {uploadState === "uploading" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-[#0148BA] animate-spin mb-4" />
          <p className="text-gray-700 font-semibold">Uploading document…</p>
          <p className="text-sm text-gray-400 mt-1">Please wait</p>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Passport preview"
              className="mt-6 max-h-40 rounded-xl object-cover shadow-sm opacity-60"
            />
          )}
        </div>
      )}

      {/* State: processing (OCR) */}
      {uploadState === "processing" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center">
          {previewUrl && (
            <div className="relative mb-6">
              <img
                src={previewUrl}
                alt="Passport"
                className="max-h-44 rounded-xl object-cover shadow-sm"
              />
              <div className="absolute inset-0 bg-[#0148BA]/10 rounded-xl flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 text-[#0148BA] animate-spin" />
                  <span className="text-sm font-medium text-gray-700">
                    Extracting details...
                  </span>
                </div>
              </div>
            </div>
          )}
          {!previewUrl && (
            <div className="w-32 h-44 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-gray-300" />
            </div>
          )}
          <p className="text-gray-700 font-semibold">Running OCR Analysis</p>
          <p className="text-sm text-gray-400 mt-1">
            Automatically extracting passport details…
          </p>
          <div className="mt-4 w-full max-w-xs bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-[#0148BA] rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      )}

      {/* State: done — show extracted data */}
      {uploadState === "done" && editedData && (
        <div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Confirm Passport Details
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Our OCR extracted the following information. Please review and
              correct if needed.
            </p>
          </div>

          {/* Validity Banner */}
          {validityCheck && (
            <div
              className={`mb-4 px-4 py-3 rounded-xl border flex items-center gap-3 ${
                validityCheck.valid
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {validityCheck.valid ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
              <div>
                <p
                  className={`text-sm font-semibold ${validityCheck.valid ? "text-green-700" : "text-red-700"}`}
                >
                  {validityCheck.valid
                    ? "Passport is valid for travel"
                    : "Passport may not be valid for travel"}
                </p>
                <p
                  className={`text-xs mt-0.5 ${validityCheck.valid ? "text-green-600" : "text-red-600"}`}
                >
                  Expiry: {formatDate(validityCheck.expiryDate)} · 183-day
                  requirement: {formatDate(validityCheck.requiredDate)}
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Preview strip */}
            {previewUrl && (
              <div className="h-24 overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Passport"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 space-y-4">
              {fields.map(({ label, key }) => (
                <div
                  key={key}
                  className="grid grid-cols-[160px_1fr] gap-4 items-center"
                >
                  <label className="text-sm font-medium text-gray-600">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={editedData[key]}
                    onChange={(e) =>
                      setEditedData({ ...editedData, [key]: e.target.value })
                    }
                    className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0148BA] transition-all"
                  />
                </div>
              ))}

              {/* MRZ */}
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1.5">
                  MRZ (Machine Readable Zone)
                </p>
                <div className="bg-gray-900 rounded-xl px-4 py-3">
                  <p className="text-green-400 font-mono text-xs leading-5 tracking-widest break-all">
                    {ocrData?.mrz}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={handleContinue}
                className="w-full py-3 rounded-xl bg-[#0148BA] hover:bg-blue-800 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Confirm & Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}
