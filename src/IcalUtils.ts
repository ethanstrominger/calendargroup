import { IcalObject } from "./IcalObject";
import { DateWithTimeZone, sync } from "node-ical";
import icalGenerator from "ical-generator";
import { IEventCreateInput } from "./IEventCreateInput";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";

const DEFAULT_TZID = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

export function createCalendarWithEvents(data: {
  calendarTzid: string;
  eventData: IEventCreateInput[];
}) {
  const cal = icalGenerator({});
  // cal.timezone with getVTimezoneComponent ensures timezone details created for
  // the event timezones.
  cal.timezone({ name: data.calendarTzid, generator: getVtimezoneComponent });

  data.eventData.forEach((event) => {
    const dtStart = new Date(event.dtStartString);
    const dtEnd = new Date(event.dtEndString);
    const tzId = event.tzId ? event.tzId : DEFAULT_TZID;
    cal.createEvent({
      id: event.uid,
      start: dtStart,
      end: dtEnd,
      timezone: tzId,
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
