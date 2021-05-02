import icalGenerator /* ical */ from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";

export const londonTimeZoneId = "Europe/London";
export const newYorkTimeZoneId = "America/New_York";

export function createCalendarWithOneTimezone(timeZoneId: string): string {
  const cal = icalGenerator({});
  cal.timezone({ name: timeZoneId, generator: getVtimezoneComponent });
  return cal.toString();
}

export function createCalendarWithTwoTimezones(
  calendarTimeZoneId: string,
  eventTimeZoneId: string
): string {
  const cal = icalGenerator({});
  // this sets the default timezone id for the calendar.  A VTIMEZONE section will
  // with the full definition for the default timezone will be added the ical text.
  cal.timezone({ name: calendarTimeZoneId, generator: getVtimezoneComponent });
  const now = new Date();
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  // A VTIMEZONE section with the full definition for the event timezone will be added the ical text.
  const event = cal.createEvent({
    start: now,
    end: new Date(now.getTime() + getTimeToHourMultiplier),
    timezone: eventTimeZoneId,
    summary: "My Event",
    description:
      "The quick brown fox jumped over the lazy dog and could not stop from jumping over the lazy dog because that is what lazy dogs and quick brown foxes like to do.  Really, I know this.  It is an amazing fact.  Okay, so let us see what what do",
    organizer: "Sebastian Pekarek <mail@example.com>",
  });
  return cal.toString();
}

interface NonRepeatingEventAttributes {
  startDate: Date;
  endDate: Date;
  eventTimezoneId?: string;
  dtStamp: Date;
  created: Date;
  location: string;
  summary: string;
  description?: string | null;
}

interface CombinedAttributes {
  calendarTimeZoneId: string;
  eventData: NonRepeatingEventAttributes;
}

export function createEventWithNonDefaultTimezone(
  combinedAttributes: CombinedAttributes
) {
  const { calendarTimeZoneId, eventData } = combinedAttributes;
  const cal = icalGenerator({});
  // this sets the default timezone id for the calendar.  A VTIMEZONE section will
  // with the full definition for the default timezone will be added the ical text.
  cal.timezone({ name: calendarTimeZoneId, generator: getVtimezoneComponent });
  const now = new Date();
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  // A VTIMEZONE section with the full definition for the event timezone will be added the ical text.
  const event = cal.createEvent({
    start: eventData.startDate,
    end: eventData.endDate,
    timezone: eventData.eventTimezoneId,
    summary: eventData.summary,
    created: eventData.created,
    stamp: eventData.dtStamp,
    location: eventData.location,
  });
  return cal.toString();
}
