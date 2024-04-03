import { EventTypes } from "../types";

declare global {
  interface Window {
    analytics?: any;
  }
}

type Traits = {
  email?: string;
  phone?: string;
  prospect_id?: string;
  insurance_waitlist?: {
    program?: string;
    company?: string | null;
    state?: string | null;
  };
};

export const identify = (traits: Traits = {}) => {
  if (!window.analytics) {
    console.log("Analytics not setup");
    return null;
  }

  return window.analytics.identify(traits);
};

export const track = (
  event: EventTypes,
  data: Record<string, string | boolean | number | undefined | null> = {}
) => {
  if (!window.analytics) {
    console.log("Analytics not setup");
    return null;
  }

  return window.analytics.track(event, data);
};
