import { Form, styled, useFormContext } from "@solace-health/ui";
import * as React from "react";

export const NextButton = styled(({ className }: { className?: string }) => {
  const { formState } = useFormContext();
  const isSubmitting = formState.isValidating || formState.isSubmitting;
  return (
    <SubmitButton
      className={className}
      id="pag-next-button"
      isSubmitting={isSubmitting}
      label="Next"
    />
  );
})`
  button {
    &,
    &:hover {
      transition: all 0.2s ease;
      background: var(--gold-500, #d7a13b) !important;
      span {
        color: #000;
      }
    }
  }
`;

const SubmitButton = styled(Form.Submit)`
  margin-top: 0;
`;
