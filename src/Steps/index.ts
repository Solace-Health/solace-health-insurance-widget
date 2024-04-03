import { PaginatedStep } from "./types";

export const PAGINATED_STEPS: {
  [key: string]: {
    name: string;
  };
} = {
  "1": {
    name: PaginatedStep.PatientInfo,
  },
  "2": {
    name: PaginatedStep.InsuranceInfo,
  },
  "3": {
    name: PaginatedStep.MedicareInfo,
  },
  "4": {
    name: PaginatedStep.AdditionalInfo,
  },
  ineligible: {
    name: PaginatedStep.PatientIneligible,
  },
  waitlist: {
    name: PaginatedStep.WaitlistConfirmed,
  },
};
