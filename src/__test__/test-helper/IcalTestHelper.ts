import icalGenerator /* ical */ from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import { AggEvent } from "src/models/AggEvent";

// notes on iCalGenerator, getVTimezoneComponent, and timezone:
// const cal = iCalGenerator({});  : initializes
// cal.timezone('America/New_York', getVTimezoneComponent) sets the default timezone
//   for the calendar and sets a full definition of that timezone in the VTIMEZONE section
// cal.createEvent ( { ..., timezone: 'Europe/Berlin' } ) sets the timezone for the event
// . and adds the full timezone definition to the calendar

export const londonTimeZoneId = "Europe/London";
export const newYorkTimeZoneId = "America/New_York";

export function createCalendarWithOneTimezone(timeZoneId: string): string {
  const cal = icalGenerator({});
  // see notes on iCalGenerator, getVTimezoneComponent, and timezone
  cal.timezone({ name: timeZoneId, generator: getVtimezoneComponent });
  return cal.toString();
}

export function createCalendarWithTwoTimezones(
  calendarTimeZoneId: string,
  eventTimeZoneId: string
): string {
  const cal = icalGenerator({});

  // see notes on iCalGenerator, getVTimezoneComponent, and timezone
  cal.timezone({ name: calendarTimeZoneId, generator: getVtimezoneComponent });
  const now = new Date();
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  const event = cal.createEvent({
    start: now,
    end: new Date(now.getTime() + getTimeToHourMultiplier),
    // see notes on iCalGenerator, getVTimezoneComponent, and timezone
    timezone: eventTimeZoneId,
    summary: "My Event",
    description:
      "The quick brown fox jumped over the lazy dog and could not stop from jumping over the lazy dog because that is what lazy dogs and quick brown foxes like to do.  Really, I know this.  It is an amazing fact.  Okay, so let us see what what do",
    organizer: "Sebastian Pekarek <mail@example.com>",
  });
  return cal.toString();
}

export function createCalendarWithEvent(
  data : {calendarTimeZoneId: string,
  eventTimeZoneId: string,
  eventData: AggEvent}
) {
  const cal = icalGenerator({});
  // see notes on iCalGenerator, getVTimezoneComponent, and timezone
  cal.timezone({ name: data.calendarTimeZoneId, generator: getVtimezoneComponent });
  cal.createEvent({
    start: data.eventData.dtStart,
    end: data.eventData.dtEnd,
    // see notes on iCalGenerator, getVTimezoneComponent, and timezone
    timezone: data.eventTimeZoneId,
    summary: data.eventData.summary,
    created: data.eventData.created,
    stamp: data.eventData.dtStamp,
    location: data.eventData.location,
  });
  return cal.toString();
}
