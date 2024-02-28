import * as React from "react";
import { Form, Flex, FormatType, useForm, Typography } from "@solace-health/ui";
import {
  Prospect,
  ProspectPayload,
  FormDataFields,
  HereFor,
  InsurancePaths,
} from "../types";
import { post } from "../utils/api";
import { Container, SubmitButton } from "./styles";

declare global {
  interface Window {
    analytics: any;
  }
}

const SearchWidget = () => {
  const formMethods = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const hereForSelf =
    formMethods.watch(FormDataFields.HereFor) === HereFor.SELF;

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
    setIsSubmitting(true);
    // track(EventTypes.HERE_FOR_SELECTED, { value: values[FormDataFields.HereFor] });
    post<Prospect>({
      path: "/api/prospects",
      body: {
        ...(removeNullValues(values) as ProspectPayload),
        payload: {
          [FormDataFields.InsurancePath]: values[FormDataFields.InsurancePath],
        },
      },
    }).then((data: Prospect) => {
      const formQuery = new URLSearchParams({
        p_id: data.id,
      });
      const redirect = `${process.env.FUNNEL_URL}/newpatient2/2?${formQuery}`;
      window.location.href = redirect;
    });
  };

  return (
    <Container>
      <Flex style={{ marginBottom: 20 }}>
        <Typography.Body>
          Submit your information to Instantly see if you qualify
        </Typography.Body>
      </Flex>
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
              label="First Name"
            />
            <Form.Text
              name={FormDataFields.LastName}
              formOptions={{ required: true }}
              label="Last Name"
            />
          </Flex>
          <Form.Text
            name={FormDataFields.Email}
            formOptions={{ required: true }}
            pattern={FormatType.Email}
            label="Email"
          />
          <Form.Text
            name={FormDataFields.Phone}
            formOptions={{ required: true }}
            format={FormatType.Phone}
            pattern={FormatType.Phone}
            label="Phone Number"
          />
          <Form.RadioGroup
            name={FormDataFields.InsurancePath}
            label={`${
              hereForSelf ? "Do you" : "Does your loved one"
            } have Medicare?`}
            options={insuranceOptions}
            formOptions={{ required: true }}
          />
          <SubmitButton isSubmitting={isSubmitting} />
        </Flex>
      </Form.Container>
    </Container>
  );
};
export default SearchWidget;
