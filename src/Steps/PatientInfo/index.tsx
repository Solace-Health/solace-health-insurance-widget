import { Form, Flex, useFormContext } from "@solace-health/ui";
import * as React from "react";
import { FormDataFields, HereFor, InsurancePaths } from "../../types";
import { NextButton } from "../../Shared/NextButton";

export const PatientInfo = () => {
  const formMethods = useFormContext();
  const hereForSelf =
    formMethods.watch(FormDataFields.HereFor) !== HereFor.LOVED_ONE;

  const hereForOptions = [
    { label: "Myself", value: HereFor.SELF },
    { label: "Someone Else", value: HereFor.LOVED_ONE },
  ];

  const insuranceOptions = [
    { label: "Yes", value: InsurancePaths.Medicare },
    { label: "No", value: InsurancePaths.Other },
  ];

  return (
    <Flex gap={24} vertical>
      <Form.RadioGroup
        name={FormDataFields.HereFor}
        label="Who do you need help for?"
        options={hereForOptions}
        formOptions={{ required: true }}
      />
      <Flex gap={16}>
        <Form.Text
          name={FormDataFields.FirstName}
          formOptions={{ required: true }}
          label={`${!hereForSelf ? "Patient's" : ""} First Name`}
        />
        <Form.Text
          name={FormDataFields.LastName}
          formOptions={{ required: true }}
          label={`${!hereForSelf ? "Patient's" : ""} Last Name`}
        />
      </Flex>
      <Form.RadioGroup
        name={FormDataFields.InsurancePath}
        label={`${hereForSelf ? "Do you" : "Does the patient"} have Medicare?`}
        options={insuranceOptions}
        formOptions={{ required: true }}
      />
      <NextButton />
    </Flex>
  );
};
