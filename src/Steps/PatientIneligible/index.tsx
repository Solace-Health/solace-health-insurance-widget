import {
  Button,
  Form,
  Divider,
  Flex,
  Typography,
  Size,
  FormatType,
  styled,
  useFormContext,
  useForm,
} from "@solace-health/ui";
import { identify, track } from "../../utils/analytics";
import * as React from "react";
import { EventTypes, FormDataFields, HereFor } from "../../types";
import { WaitlistConfirmed } from "../WaitlistConfirmed";
import { getCookie, Cookie } from "../../utils/cookie";

const Banner = styled(({ className }: { className?: string }) => (
  <Flex wrap="nowrap" className={className} gap={22} align="center">
    <Typography.Display size={Size.XS}>Under Construction</Typography.Display>
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.4791 1.6491L4.82043 3.97725L6.8093 6.64531L6.14209 7.19686L4.17706 4.53153L1.70718 6.68808L1.18221 5.99976L3.65209 3.84321L1.60537 1.04772L2.27258 0.496175L4.2982 3.26509L6.95413 0.960778L7.4791 1.6491Z"
        fill="black"
      />
    </svg>
    <Typography.Display size={Size.XS}>Under Construction</Typography.Display>
  </Flex>
))`
  position: absolute;
  left: -10px;
  top: 50px;
  white-space: nowrap;
  border: 1px solid var(--Color-Golds-Metallic-Gold, #d7a13b);
  background: var(--gold-300, #e9cc95);
  transform: rotate(6.544deg);
  padding: 12px 20px 10px;
  text-transform: uppercase;
`;

export const PatientIneligible = () => {
  const prospectId = getCookie(Cookie.ProspectId);
  const { getValues } = useFormContext();
  const formData = getValues();

  const isHereForLovedOne =
    formData[FormDataFields.HereFor] === HereFor.LOVED_ONE;

  const onRedirectToPaid = () => {
    const formQuery = new URLSearchParams({
      p_id: prospectId,
    });
    const redirect = `${process.env.FUNNEL_URL}/6?${formQuery}`;
    window.location.href = redirect;
  };

  return (
    <Flex vertical align="center">
      <Flex gap={28} vertical>
        <Banner />

        <Flex
          vertical
          gap={16}
          align="center"
          justify="center"
          style={{ textAlign: "center", paddingTop: 100 }}
        >
          <Typography.Display size={Size.SM}>
            Advocacy isn’t covered by{" "}
            {isHereForLovedOne ? "your loved one's" : "your"} insurance just
            yet. We’re working on it!
          </Typography.Display>
          <Typography.Body color="#3F937C" size={Size.LG}>
            We’re working behind-the-scenes to expand our services. If you need
            help sooner, many of our advocates offer free consultations and
            hourly rates.
          </Typography.Body>
        </Flex>

        <Flex vertical gap={10}>
          <Form.Text
            name="email"
            pattern={FormatType.Email}
            formOptions={{ required: true }}
            placeholder="Email Address"
          />
          <Form.Submit label="Add me to the Waitlist" />
        </Flex>
      </Flex>
      <Flex vertical gap={5} style={{ marginTop: 5, width: "100%" }}>
        <Divider>
          <Typography.Display size={Size.XS}>or</Typography.Display>
        </Divider>
        <Button.Outline onClick={onRedirectToPaid}>
          Find an Advocate Out-of-Pocket
        </Button.Outline>
      </Flex>
    </Flex>
  );
};
