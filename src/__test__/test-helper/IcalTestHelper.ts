import icalGenerator /* ical */ from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import { AggEvent } from "src/models/AggEvent";

// notes on iCalGenerator, getVTimezoneComponent, and timezone:
// const cal = iCalGenerator({});  : initializes
// cal.timezone('America/New_York', getVTimezoneComponent) sets the default timezone
//   for the calendar and sets a full definition of that timezone in the VTIMEZONE section
// cal.createEvent ( { ..., timezone: 'Europe/Berlin' } ) sets the timezone for the event
// . and adds the full timezone definition to the calendar

export const londonTimezoneId = "Europe/London";
export const newYorkTimezoneId = "America/New_York";

export function createCalendarWithOneTimezone(timezoneId: string): string {
  const cal = icalGenerator({});
  // see notes on iCalGenerator, getVTimezoneComponent, and timezone
  cal.timezone({ name: timezoneId, generator: getVtimezoneComponent });
  return cal.toString();
}

export function createCalendarWithEvent(data: {
  defaultTimezoneId: string;
  eventTimezoneId: string;
  eventData: AggEvent;
}) {
  const cal = icalGenerator({});
  // see notes on iCalGenerator, getVTimezoneComponent, and timezone
  cal.timezone({
    name: data.defaultTimezoneId,
    generator: getVtimezoneComponent,
  });
  cal.createEvent({
    start: data.eventData.dtStart,
    end: data.eventData.dtEnd,
    // see notes on iCalGenerator, getVTimezoneComponent, and timezone
    timezone: data.eventTimezoneId,
    summary: data.eventData.summary,
    created: data.eventData.created,
    stamp: data.eventData.dtStamp,
    location: data.eventData.location,
  });
  return cal.toString();
}
