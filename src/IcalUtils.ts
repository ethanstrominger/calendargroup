import { IcalObject } from "./IcalObject";
import { DateWithTimeZone, TimeZoneDef, sync } from "node-ical";
import icalGenerator /* ical */ from "ical-generator";

export interface IEventCreateInput {
  uid: string;
  dtStartString: string;
  dtEndString: string;
  tzId?: string;
  dtStamp: Date;
  created: Date;
  location: string;
  summary: string;
}

export function createCalendarWithEvents(data: {
  eventData: IEventCreateInput[];
}) {
  const cal = icalGenerator({});
  // Notes on iCalGenerator, getVTimezoneComponent, and timezone:
  // const cal = iCalGenerator({});  : initializes
  // cal.timezone('America/New_York', getVTimezoneComponent) sets the default timezone
  //   for the calendar and sets a full definition of that timezone in the VTIMEZONE section
  // cal.createEvent ( { ..., timezone: 'Europe/Berlin' } ) sets the timezone for the event
  // and adds the full timezone definition to the calendar

  data.eventData.forEach((event) => {
    const dtStart = new Date(event.dtStartString);
    const dtEnd = new Date(event.dtEndString);
    cal.createEvent({
      id: event.uid,
      start: dtStart,
      end: dtEnd,
      timezone: event.tzId,
      summary: event.summary,
      created: event.created,
      stamp: event.dtStamp,
      location: event.location,
    });
  });
  return cal.toString();
}

export function getIcalObjectFromText(icalText: string): IcalObject {
  const icalData = sync.parseICS(icalText);
  const icalObject = new IcalObject();

  for (const parsedEvent of Object.values(icalData).filter(
    (obj) => obj.type == "VEVENT"
  )) {
    icalObject.events.push({
      uid: parsedEvent.uid.toString(),
      dtStart: parsedEvent.start as Date,
      dtEnd: parsedEvent.end as Date,
      dtStamp: parsedEvent.dtstamp as Date,
      created: parsedEvent.created as Date,
      location: parsedEvent.location as string,
      summary: parsedEvent.summary as string,
      recurrenceId: parsedEvent.recurrenceid,
      rrule: parsedEvent.rrule?.toString(),
      tzid: (parsedEvent.start as DateWithTimeZone).tz,
    });
  }
  return icalObject;
}
