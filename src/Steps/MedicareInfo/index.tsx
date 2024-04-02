/* eslint-disable react/jsx-no-useless-fragment */
import { Flex, Form, FormatType, useFormContext } from "@solace-health/ui";
import * as React from "react";
import { FormDataFields, HereFor, InsurancePaths } from "../../types";
import { get } from "../../utils/api";
import { InsuranceCompany } from "../AdditionalInfo";
import { STATES } from "../../utils/const";
import { NextButton } from "../../Shared/NextButton";

export const MedicareInfo = () => {
  const { getValues } = useFormContext();
  const formData = getValues();
  const isHereForLovedOne =
    formData[FormDataFields.HereFor] === HereFor.LOVED_ONE;
  const markedWithMedicareAdvantage =
    formData[FormDataFields.InsurancePath] === InsurancePaths.MedicareAdvantage;

  const [companies, setCompanies] = React.useState<InsuranceCompany[]>([]);

  const getInsuranceCompanies = async () => {
    const response = await get<InsuranceCompany[]>({
      path: "/api/insurance_companies",
    });

    setCompanies(response);
  };

  React.useEffect(() => {
    getInsuranceCompanies();
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

  return (
    <Flex gap={24} vertical>
      <>
        {markedWithMedicareAdvantage && (
          <Form.SelectMenu
            label={`What company is ${
              isHereForLovedOne ? "your loved one's" : "your"
            } Medicare Advantage plan with?`}
            name={FormDataFields.InsuranceCompanyId}
            options={options}
            formOptions={{ required: true }}
          />
        )}
      </>

      <Form.SelectMenu
        placeholder="Start typing here..."
        label={`Where ${
          isHereForLovedOne ? "is your loved one" : "are you"
        } located?`}
        name={FormDataFields.State}
        formOptions={{ required: true }}
        options={STATES}
      />

      <Form.Text
        name={FormDataFields.Email}
        formOptions={{ required: true }}
        pattern={FormatType.Email}
        label="Email"
      />
      <NextButton />
    </Flex>
  );
};
