export enum InsurancePaths {
  Medicare = "medicare",
  MedicareAdvantage = "medicare_advantage",
  Medicaid = "medicaid",
  Private = "private",
  Other = "other",
}
export enum FormDataFields {
  // Page 1
  HereFor = "here_for",
  // Page 2
  InsurancePath = "insurance_path",
  // Page 3
  State = "state",
  // Page 4
  InsuranceCompanyId = "insurance_company_id",
  // Page 6
  TimeOfDay = "time_of_day",
  FirstName = "first_name",
  LastName = "last_name",
  Phone = "phone",
  Email = "email",
  Reason = "reason",
  PolicyHolder = "policy_holder",
  PolicyHolderFirstName = "policy_holder_first_name",
  PolicyHolderLastName = "policy_holder_last_name",
  PolicyHolderRelationship = "policy_holder_relationship",
  // Page 9
  MedicareNumber = "medicare_number",
  Medigap = "medigap",
  // Page 10
  InsuranceId = "insurance_id",
  DualEligible = "dual_eligible",
  MemberId = "member_id",
  PatientDOB = "patient_dob",
  PatientSex = "patient_sex",
  SubscriberDOB = "subscriber_dob",
  SubscriberSex = "subscriber_sex",
  SubscriberSSN = "subscriber_ssn",
  ConsentCheck = "consent_check",

  // Page 12
  SupplementalInsurance = "supplemental_insurance",

  HowCanWeHelp = "how_can_we_help",
}

export enum HereFor {
  SELF = "self",
  LOVED_ONE = "loved_one",
}

export type ProspectPayload = {
  here_for?: HereFor | null;
  insurance_path?: InsurancePaths | null;
  state?: string | null;
  city?: string | null;
  lat?: string | null;
  long?: string | null;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  reason?: string[];
  time_of_day?: string | null;
  policy_holder?: string;
  policy_holder_first_name?: string | null;
  policy_holder_last_name?: string | null;
  policy_holder_relationship?: string | null;
  payor_id?: string | null;
  has_health_insurance?: boolean;
  insurance_company_id?: string | null;
  supplemental_insurance?: string | null;
  medicare_number?: string | null;
  medigap?: string | null;
  insurance_id?: string | null;
  member_id?: string | null;
  patient_dob?: string | null;
  patient_sex?: string | null;
  subscriber_dob?: string | null;
  subscriber_sex?: string | null;
  subscriber_ssn?: string | null;
  consent_check?: string | null;
  how_can_we_help?: string | null;
};

export type Prospect<Include = unknown> = {
  id: string;
  user_id: string | null;
  booking_id: string | null;
  booking_hold_id: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  here_for: HereFor;
  last_interaction_dt: Date;
  loved_one_name: string | null;
  loved_one_relationship: string | null;
  category: string | null;
  conditions: string[];
  how_can_we_help: string | null;
  city: string | null;
  state: string | null;
  requires_in_person: boolean;
  extra_context: string | null;
  lat: string;
  long: string;
  payload: ProspectPayload;

  is_here_for_self: boolean;
  is_here_for_loved_one: boolean;
} & Include;

export enum EventTypes {
  HERE_FOR_SELECTED = "HERE_FOR_SELECTED",
  FUNNEL_ENTRY = "FUNNEL_ENTRY",
  INSURANCE_TYPE_SELECTED = "INSURANCE_TYPE_SELECTED",
  WAITLIST_EMAIL_SUBMITTED = "WAITLIST_EMAIL_SUBMITTED",
}
