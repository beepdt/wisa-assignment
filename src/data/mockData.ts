export interface OcrPassportData {
  surname: string;
  givenNames: string;
  nationality: string;
  dateOfBirth: string;
  passportNumber: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  mrz: string;
}

export interface GeneratedLink {
  id: string;
  customerName: string;
  destinationCountry: string;
  travelDateFrom: string;
  travelDateTo: string;
  applicantType: string;
  numberOfPax: number;
  employmentType: string;
  createdAt: string;
}

export interface GstData {
  panNumber: string;
  registeredName: string;
  gstin: string;
}

export const mockOcrData: OcrPassportData = {
  surname: "SMITH",
  givenNames: "JOHN MICHAEL",
  nationality: "INDIAN",
  dateOfBirth: "15/08/1990",
  passportNumber: "N4539827",
  dateOfIssue: "20/03/2019",
  dateOfExpiry: "19/03/2029",
  mrz: "P<INDSMITH<<JOHN<MICHAEL<<<<<<<<<<<<<<<<<<<\nN4539827<3IND9008151M2903192<<<<<<<<<<<<<<<6",
};

export const mockGstData: GstData = {
  panNumber: "ABCPS1234D",
  registeredName: "JOHN MICHAEL SMITH",
  gstin: "27ABCPS1234D1Z5",
};

export type ApplicationStatus =
  | "draft"
  | "link_generated"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected";

export interface Document {
  id: string;
  name: string;
  description: string;
  status: "validated" | "review_required" | "pending" | "rejected";
  type:
    | "passport"
    | "id_card"
    | "bank_statement"
    | "itinerary"
    | "flight"
    | "photo"
    | "other";
}

export interface DocumentCategory {
  title: string;
  icon: string;
  documents: Document[];
}

export interface ValidationItem {
  label: string;
  status: "validated" | "manual_check" | "pending" | "failed";
  note?: string;
}

export interface Application {
  id: string;
  applicantName: string;
  destination: string;
  country: string;
  travelDates: string;
  status: ApplicationStatus;
  statusLabel: string;
  submittedAt: string;
  passportNo: string;
  type: string;
  pax: number;
  applicationId: string;
  imageUrl: string;
  progressStep: number; // 0-3
  documentCategories: DocumentCategory[];
  validationItems: ValidationItem[];
}

export const applications: Application[] = [
  {
    id: "1",
    applicantName: "John Smith",
    destination: "Paris",
    country: "France",
    travelDates: "Feb 5-12, 2025",
    status: "submitted",
    statusLabel: "Submitted",
    submittedAt: "Jan 23, 2026 · 6:08 PM",
    passportNo: "N4539827",
    type: "Family",
    pax: 3,
    applicationId: "APP-2025-001",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=300&fit=crop",
    progressStep: 1,
    documentCategories: [
      {
        title: "Personal Documents",
        icon: "user",
        documents: [
          {
            id: "d1",
            name: "Passport Copy",
            description: "Front and back pages",
            status: "validated",
            type: "passport",
          },
          {
            id: "d2",
            name: "Aadhaar Card",
            description: "Government ID",
            status: "review_required",
            type: "id_card",
          },
        ],
      },
      {
        title: "Financial Documents",
        icon: "circle-dollar-sign",
        documents: [
          {
            id: "d3",
            name: "Bank Statement",
            description: "Last 6 months",
            status: "review_required",
            type: "bank_statement",
          },
        ],
      },
      {
        title: "Travel Documents",
        icon: "plane",
        documents: [
          {
            id: "d4",
            name: "Travel Itinerary",
            description: "Complete travel plan",
            status: "validated",
            type: "itinerary",
          },
          {
            id: "d5",
            name: "Flight Booking",
            description: "Round trip confirmation",
            status: "validated",
            type: "flight",
          },
        ],
      },
      {
        title: "Additional Documents",
        icon: "file-text",
        documents: [],
      },
    ],
    validationItems: [
      { label: "Identity Proof", status: "validated" },
      {
        label: "Photo Clarity",
        status: "manual_check",
        note: "The photo couldn't be automatically verified due to clarity.\nOur team is manually reviewing it to ensure it meets the requirements.",
      },
      { label: "Document Validity", status: "validated" },
      { label: "Date Format", status: "validated" },
    ],
  },
  {
    id: "2",
    applicantName: "John Smith",
    destination: "Rome",
    country: "Italy",
    travelDates: "Feb 5-12, 2025",
    status: "link_generated",
    statusLabel: "In Progress",
    submittedAt: "Jan 23, 2026 · 6:08 PM",
    passportNo: "N4539827",
    type: "Solo",
    pax: 1,
    applicationId: "APP-2025-002",
    imageUrl:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=300&fit=crop",
    progressStep: 0,
    documentCategories: [
      {
        title: "Personal Documents",
        icon: "user",
        documents: [
          {
            id: "d6",
            name: "Passport Copy",
            description: "Front and back pages",
            status: "pending",
            type: "passport",
          },
        ],
      },
      {
        title: "Financial Documents",
        icon: "circle-dollar-sign",
        documents: [],
      },
      {
        title: "Travel Documents",
        icon: "plane",
        documents: [],
      },
      {
        title: "Additional Documents",
        icon: "file-text",
        documents: [],
      },
    ],
    validationItems: [],
  },
  {
    id: "3",
    applicantName: "John Smith",
    destination: "New York",
    country: "USA",
    travelDates: "Feb 5-12, 2025",
    status: "approved",
    statusLabel: "Approved",
    submittedAt: "Jan 20, 2026 · 2:30 PM",
    passportNo: "N4539827",
    type: "Business",
    pax: 1,
    applicationId: "APP-2025-003",
    imageUrl:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=300&fit=crop",
    progressStep: 3,
    documentCategories: [
      {
        title: "Personal Documents",
        icon: "user",
        documents: [
          {
            id: "d7",
            name: "Passport Copy",
            description: "Front and back pages",
            status: "validated",
            type: "passport",
          },
          {
            id: "d8",
            name: "Photograph",
            description: "Passport size photo",
            status: "validated",
            type: "photo",
          },
        ],
      },
      {
        title: "Financial Documents",
        icon: "circle-dollar-sign",
        documents: [
          {
            id: "d9",
            name: "Bank Statement",
            description: "Last 6 months",
            status: "validated",
            type: "bank_statement",
          },
        ],
      },
      {
        title: "Travel Documents",
        icon: "plane",
        documents: [
          {
            id: "d10",
            name: "Travel Itinerary",
            description: "Complete travel plan",
            status: "validated",
            type: "itinerary",
          },
          {
            id: "d11",
            name: "Flight Booking",
            description: "Round trip confirmation",
            status: "validated",
            type: "flight",
          },
        ],
      },
      {
        title: "Additional Documents",
        icon: "file-text",
        documents: [],
      },
    ],
    validationItems: [
      { label: "Identity Proof", status: "validated" },
      { label: "Photo Clarity", status: "validated" },
      { label: "Document Validity", status: "validated" },
      { label: "Date Format", status: "validated" },
    ],
  },
];
