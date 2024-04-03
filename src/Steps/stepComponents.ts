import { MedicareInfo } from "./MedicareInfo/index";
import { AdditionalInfo } from "./AdditionalInfo";
import { InsuranceInfo } from "./InsuranceInfo";
import { PatientIneligible } from "./PatientIneligible";
import { PatientInfo } from "./PatientInfo";
import { PaginatedStep } from "./types";
import { WaitlistConfirmed } from "./WaitlistConfirmed";

export const PAGINATED_COMPONENTS: {
  [key: string]: () => JSX.Element;
} = {
  [PaginatedStep.PatientInfo]: PatientInfo,
  [PaginatedStep.InsuranceInfo]: InsuranceInfo,
  [PaginatedStep.MedicareInfo]: MedicareInfo,
  [PaginatedStep.AdditionalInfo]: AdditionalInfo,
  [PaginatedStep.PatientIneligible]: PatientIneligible,
  [PaginatedStep.WaitlistConfirmed]: WaitlistConfirmed,
};
