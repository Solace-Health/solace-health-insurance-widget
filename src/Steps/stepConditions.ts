import { FormDataFields, InsurancePaths } from "../types";

export const PAGINATED_STEP_CONDITIONS: {
  [key: string]: {
    name: string;
    condition?: (data: any) => boolean;
    skip?: (data: any) => boolean;
  };
} = {
  "1": {
    name: "PatientInfo",
  },
  "2": {
    name: "InsuranceInfo",
  },
  "3": {
    name: "MedicareInfo",
    condition: (data: any) => !!data[FormDataFields.InsurancePath],
    skip: (data: any) =>
      ![InsurancePaths.Medicare, InsurancePaths.MedicareAdvantage].includes(
        data[FormDataFields.InsurancePath]
      ),
  },
  "4": {
    name: "AdditionalInfo",
    condition: (data: any) => !!data[FormDataFields.InsurancePath],
    skip: (data: any) =>
      [InsurancePaths.Medicare, InsurancePaths.MedicareAdvantage].includes(
        data[FormDataFields.InsurancePath]
      ),
  },
  ineligible: {
    name: "PatientIneligible",
    condition: (data: any) => !!data[FormDataFields.InsurancePath],
  },
  waitlist: {
    name: "WaitlistConfirmed",
  },
};
