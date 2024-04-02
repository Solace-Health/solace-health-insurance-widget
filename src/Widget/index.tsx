import * as React from "react";
import { Form, useForm } from "@solace-health/ui";
import {
  Prospect,
  ProspectPayload,
  FormDataFields,
  EventTypes,
} from "../types";
import { post } from "../utils/api";
import { Container } from "./styles";
import { identify, track } from "../utils/analytics";
import { useTransition, animated, config } from "@react-spring/web";
import { PAGINATED_STEPS } from "../Steps";
import { PAGINATED_COMPONENTS } from "../Steps/stepComponents";
import { Wrapper } from "../Wrapper";
import { removeNullValues } from "../utils/object";
import { coverageFlags } from "./coverageFlags";
import { setCookie, Cookie } from "../utils/cookie";

const SearchWidget = () => {
  const formMethods = useForm();
  const [prospect, setProspect] = React.useState<Prospect>();
  const [currentStep, setStep] = React.useState("1");

  const onHandleSubmit = (values: ProspectPayload) => {
    if (currentStep === "ineligible") {
      const formData = formMethods.getValues();
      const prospectEmail = values.email || formData[FormDataFields.Email];
      if (!prospectEmail) return;
      identify({
        email: prospectEmail,
        prospect_id: prospect.id,
        insurance_waitlist: {
          program: formData[FormDataFields.InsurancePath],
          company: formData[FormDataFields.InsuranceCompanyId],
          state: formData[FormDataFields.State],
        },
      });

      track(EventTypes.WAITLIST_EMAIL_SUBMITTED);
      setStep("waitlist");
      return;
    }

    post<Prospect>({
      path: "/api/prospects",
      body: {
        id: prospect?.id,
        ...removeNullValues(values),
        payload: removeNullValues({
          [FormDataFields.InsurancePath]: values[FormDataFields.InsurancePath],
          [FormDataFields.InsuranceCompanyId]:
            values[FormDataFields.InsuranceCompanyId],
          [FormDataFields.PatientDOB]: values[FormDataFields.PatientDOB],
        }),
      },
    }).then((data: Prospect) => {
      const { isCovered, isMedicaid, isPrivate } = coverageFlags({
        ...data,
        ...data.payload,
      });
      setProspect(data);
      setCookie(Cookie.ProspectId, data.id);
      if (["3", "4"].includes(currentStep)) {
        if (isCovered) {
          const formQuery = new URLSearchParams({
            p_id: data.id,
          });
          const redirect = `${process.env.FUNNEL_URL}/newpatient2/5/eligible?${formQuery}`;
          window.location.href = redirect;
        } else {
          setStep("ineligible");
        }
      } else {
        if (currentStep === "2" && (isMedicaid || isPrivate)) {
          setStep("4");
          return;
        }
        setStep(String(Number(currentStep) + 1));
      }
    });
  };

  const transitions = useTransition(PAGINATED_STEPS[currentStep], {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    exitBeforeEnter: true,
    config: config.gentle,
  });

  const stepConfig = PAGINATED_STEPS[currentStep];
  if (!stepConfig) {
    console.error(`No Config for step ${currentStep}`);
    return null;
  }

  return (
    <Container>
      <Form.Container onSubmit={onHandleSubmit} formMethods={formMethods}>
        <Wrapper>
          {transitions((style, item) => {
            const CurrentStepComponent = PAGINATED_COMPONENTS[item.name];
            return (
              <animated.div style={{ ...style }}>
                <CurrentStepComponent />
              </animated.div>
            );
          })}
        </Wrapper>
      </Form.Container>
    </Container>
  );
};
export default SearchWidget;
