import icalGenerator /* ical */ from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import { AggEvent } from "src/models/AggEvent";

export const berlinTimezoneId = "Europe/London";
export const londonTimezoneId = "Europe/London";
export const newYorkTimezoneId = "America/New_York";

export function createCalendarWithEvents(data: { eventData: AggEvent[] }) {
  const cal = icalGenerator({});
  // Notes on iCalGenerator, getVTimezoneComponent, and timezone:
  // const cal = iCalGenerator({});  : initializes
  // cal.timezone('America/New_York', getVTimezoneComponent) sets the default timezone
  //   for the calendar and sets a full definition of that timezone in the VTIMEZONE section
  // cal.createEvent ( { ..., timezone: 'Europe/Berlin' } ) sets the timezone for the event
  // and adds the full timezone definition to the calendar
  cal.timezone({
    name: "UTC",
    generator: getVtimezoneComponent,
  });
  data.eventData.forEach((event) =>
    cal.createEvent({
      start: event.dtStart,
      end: event.dtEnd,
      // see notes on iCalGenerator, getVTimezoneComponent, and timezone
      timezone: event.timezoneId,
      summary: event.summary,
      created: event.created,
      stamp: event.dtStamp,
      location: event.location,
    })
  );
  return cal.toString();
}
