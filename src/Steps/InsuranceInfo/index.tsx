/* eslint-disable react/jsx-no-useless-fragment */
import { Flex, Form, Icons, styled, useFormContext } from "@solace-health/ui";
import * as React from "react";
import { FormDataFields, HereFor, InsurancePaths } from "../../types";
import { NextButton } from "../../Shared/NextButton";
import { getCookie, Cookie } from "../../utils/cookie";

export const FooterLink = styled.a`
  color: var(--Sherwood-Evening-Sea, #285e50);
  font-family: Lato, helvetica, sans-serif;
  font-size: 1rem;
  line-height: 18px;
  font-style: normal;
  font-weight: 900;
  text-decoration: none;
  display: flex;
  gap: 8px;
`;

export const InsuranceInfo = () => {
  const prospectId = getCookie(Cookie.ProspectId);
  const { getValues } = useFormContext();
  const formData = getValues();
  const isHereForLovedOne =
    formData[FormDataFields.HereFor] === HereFor.LOVED_ONE;
  const markedWithMedicare = [
    InsurancePaths.Medicare,
    InsurancePaths.MedicareAdvantage,
  ].includes(formData[FormDataFields.InsurancePath]);

  const insuranceTypeOptions = markedWithMedicare
    ? [
        { label: "Original Medicare", value: InsurancePaths.Medicare },
        {
          label: "Medicare Advantage",
          value: InsurancePaths.MedicareAdvantage,
        },
      ]
    : [
        { label: "Medicaid", value: InsurancePaths.Medicaid },
        { label: "Private Health Insurance", value: InsurancePaths.Private },
      ];

  return (
    <Flex gap={24} vertical>
      <Form.RadioGroup
        name={FormDataFields.InsurancePath}
        label={`What type of ${markedWithMedicare ? "Medicare" : "insurance"} ${
          !isHereForLovedOne ? "do you" : "does the patient"
        } have?`}
        options={insuranceTypeOptions}
        formOptions={{ required: true }}
      />

      <>
        {!markedWithMedicare && (
          <FooterLink href={`${process.env.FUNNEL_URL}/5?p_id=${prospectId}`} target="_blank">
            I will be paying out-of-pocket{" "}
            <Icons.Arrow color="#285e50" size={18} />
          </FooterLink>
        )}
      </>
      <Form.DateDropdown
        name={FormDataFields.PatientDOB}
        label={`${isHereForLovedOne ? "Subscriber " : ""} Date of Birth`}
        formOptions={{
          required: { message: "This field is required", value: true },
        }}
      />
      <NextButton />
    </Flex>
  );
};
