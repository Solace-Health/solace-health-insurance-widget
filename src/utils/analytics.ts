import { EventTypes } from "../types";

declare global {
  interface Window {
    analytics?: any;
  }
}

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
