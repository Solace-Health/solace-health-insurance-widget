import { Flex, Form, useFormContext } from "@solace-health/ui";
import { useEffect, useState } from "react";
import { get } from "../../utils/api";
import * as React from "react";
import { FormDataFields, HereFor, InsurancePaths } from "../../types";
import { STATES } from "../../utils/const";
import { capitalize } from "../../utils/string";
import { NextButton } from "../../Shared/NextButton";

enum Option {
  Yes = "yes",
  No = "no",
}

export type InsuranceCompany = {
  id: string;
  name: string;
};

export const AdditionalInfo = () => {
  const { getValues, watch } = useFormContext();
  const formData = getValues();
  const [initData, setInitData] = React.useState(formData);
  const isHereForLovedOne =
    formData[FormDataFields.HereFor] === HereFor.LOVED_ONE;
  const [companies, setCompanies] = useState<InsuranceCompany[]>([]);

  const getInsuranceCompanies = async () => {
    const response = await get<InsuranceCompany[]>({
      path: "/api/insurance_companies",
    });

    setCompanies(response);
  };

  useEffect(() => {
    getInsuranceCompanies();
    setInitData(formData);
  }, []);

  const insuranceCompanyOptions: { label: string; value: string }[] =
    companies?.map((insuranceCompany) => ({
      label: insuranceCompany.name,
      value: insuranceCompany.id,
    }));

  const options = (insuranceCompanyOptions || []).concat({
    label: "Other",
    value: "other",
  });

  const isMedicaid =
    initData[FormDataFields.InsurancePath] === InsurancePaths.Medicaid;
  const isDual = watch(FormDataFields.DualEligible) === Option.Yes;

  const dualOptions = [
    { label: capitalize(Option.Yes), value: Option.Yes },
    { label: capitalize(Option.No), value: Option.No },
  ];

  const medicareOptions = [
    { label: "Original Medicare", value: InsurancePaths.Medicare },
    { label: "Medicare Advantage", value: InsurancePaths.MedicareAdvantage },
  ];

  return (
    <Flex gap={24} vertical>
      {isMedicaid ? (
        <>
          <Form.RadioGroup
            name={FormDataFields.DualEligible}
            label={`${
              isHereForLovedOne ? "Is your loved one" : "Are you"
            } dual-eligible?`}
            options={dualOptions}
            formOptions={{ required: true }}
          />

          {isDual && (
            <Form.RadioGroup
              name={FormDataFields.InsurancePath}
              label={`What type of Medicare ${
                !isHereForLovedOne ? "do you" : "does the patient"
              } have?`}
              options={medicareOptions}
              formOptions={{ required: true }}
            />
          )}
        </>
      ) : (
        <Form.SelectMenu
          label={`Select ${
            isHereForLovedOne ? "your loved one's" : "your"
          } insurance company`}
          name={FormDataFields.InsuranceCompanyId}
          options={options}
          formOptions={{ required: true }}
        />
      )}

      <Form.SelectMenu
        placeholder="Start typing here..."
        label={`Where ${
          isHereForLovedOne ? "is your loved one" : "are you"
        } located?`}
        name={FormDataFields.State}
        formOptions={{ required: true }}
        options={STATES}
      />
      <NextButton />
    </Flex>
  );
};
