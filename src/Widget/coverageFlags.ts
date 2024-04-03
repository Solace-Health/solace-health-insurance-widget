import { FormDataFields, InsurancePaths, ProspectPayload } from "../types";

export const MEDICAID_COVERED_STATES: string[] = [];
export const MEDICARE_EXCLUDED_STATES: string[] = [
  "KS",
  "CT",
  "MA",
  "RI",
  "WV",
  "PA",
];

export const coverageFlags = (formData: ProspectPayload) => {
  const isMedicaid =
    formData[FormDataFields.InsurancePath] === InsurancePaths.Medicaid;
  const isCoveredByMedicaid =
    isMedicaid &&
    MEDICAID_COVERED_STATES.includes(formData[FormDataFields.State] as string);

  const isMedicareAdvantage =
    formData[FormDataFields.InsurancePath] === InsurancePaths.MedicareAdvantage;

  const isMedicare =
    formData[FormDataFields.InsurancePath] === InsurancePaths.Medicare ||
    isMedicareAdvantage;
  const isCoveredByMedicare =
    isMedicare &&
    !MEDICARE_EXCLUDED_STATES.includes(
      formData[FormDataFields.State] as string
    );

  const isPrivate =
    formData[FormDataFields.InsurancePath] === InsurancePaths.Private;

  const isCovered = ((): boolean => {
    if (isPrivate) return false;

    if (isMedicaid && !isCoveredByMedicaid) {
      return false;
    }

    if (isMedicareAdvantage) {
      return false;
    }

    return isCoveredByMedicare;
  })();

  return {
    isMedicaid,
    isCoveredByMedicaid,
    isMedicare,
    isCoveredByMedicare,
    isMedicareAdvantage,
    isPrivate,
    isCovered,
  };
};
