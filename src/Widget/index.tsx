import * as React from "react";
import { Form, Flex, FormatType, useForm, Typography } from "@solace-health/ui";
import {
  Prospect,
  ProspectPayload,
  FormDataFields,
  HereFor,
  InsurancePaths,
  EventTypes,
} from "../types";
import { post } from "../utils/api";
import { Container, SubmitButton } from "./styles";
import { track } from "../utils/analytics";

const SearchWidget = () => {
  const formMethods = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const hereForSelf =
    formMethods.watch(FormDataFields.HereFor) !== HereFor.LOVED_ONE;

  const hereForOptions = [
    { label: "Myself", value: HereFor.SELF },
    { label: "A loved one", value: HereFor.LOVED_ONE },
  ];

  const insuranceOptions = [
    { label: "Yes", value: InsurancePaths.Medicare },
    { label: "No", value: InsurancePaths.Other },
  ];

  const removeNullValues = <T extends { [key: string]: unknown }>(
    obj: T
  ): Partial<T> =>
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  const onHandleSubmit = (values: ProspectPayload) => {
    track(EventTypes.HERE_FOR_SELECTED, {
      value: values[FormDataFields.HereFor],
    });
    setIsSubmitting(true);
    post<Prospect>({
      path: "/api/prospects",
      body: {
        ...(removeNullValues(values) as ProspectPayload),
        payload: {
          [FormDataFields.InsurancePath]: values[FormDataFields.InsurancePath],
          [FormDataFields.PatientDOB]: values[FormDataFields.PatientDOB],
        },
      },
    })
      .then((data: Prospect) => {
        const formQuery = new URLSearchParams({
          p_id: data.id,
        });
        const redirect = `${process.env.FUNNEL_URL}/newpatient2/2?${formQuery}`;
        window.location.href = redirect;
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container>
      <Form.Container onSubmit={onHandleSubmit} formMethods={formMethods}>
        <Flex gap={16} vertical>
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
          <Form.Text
            name={FormDataFields.Email}
            formOptions={{ required: true }}
            pattern={FormatType.Email}
            label="Email"
          />
          <Form.DateDropdown
            name={FormDataFields.PatientDOB}
            label={`${!hereForSelf ? "Patient's " : ""} Date of Birth`}
            formOptions={{
              required: { message: "This field is required", value: true },
            }}
            containerStyle={{ marginBottom: 0 }}
          />
          <Form.RadioGroup
            name={FormDataFields.InsurancePath}
            label={`${
              hereForSelf ? "Do you" : "Does this person"
            } have Medicare?`}
            options={insuranceOptions}
            formOptions={{ required: true }}
          />
          <SubmitButton isSubmitting={isSubmitting} label="Get Started" />
        </Flex>
      </Form.Container>
    </Container>
  );
};
export default SearchWidget;
