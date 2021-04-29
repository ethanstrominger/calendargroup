import icalGenerator /* ical */ from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";

export const newYorkTimeZoneName = "America/New_York";
export function createCalendarWithOneTimezone(timeZoneName: string): string {
  const cal = icalGenerator({});
  cal.timezone({ name: "America/New_York", generator: getVtimezoneComponent });
  return cal.toString();
}
