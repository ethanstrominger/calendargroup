import { IcalObject } from "./IcalObject";
import { DateWithTimeZone, sync } from "node-ical";
import icalGenerator from "ical-generator";
import { IEventCreateInput } from "./IEventCreateInput";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import moment from "moment";

const DEFAULT_TZID = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

export function getIcalTextFromEvents(data: {
  calendarTzid: string;
  eventData: IEventCreateInput[];
}) {
  const cal = icalGenerator({});
  // cal.timezone with getVTimezoneComponent ensures timezone details created for
  // the event timezones.
  cal.timezone({ name: data.calendarTzid, generator: getVtimezoneComponent });

  data.eventData.forEach((event) => {
    // WARNING: ICalCalendar expects the date to be supplied incorrectly and then corrects it. 
    // Example:
    // - When we want to specify this: 18:00 Berlin Time (17:00 UTC)
    // - We create JS Date of 18:00, which results in a UTC time of 23:00 UTC if the server is in Eastern Time 
    //   (which is off by 6 hours, i.e., 23:00 - 17:00 = 6 hours)
    // - ICalCalendar takes the incorrect date (which is off by 6 hours) and the intended tzid and corrects it
    const dtStart = new Date(event.dtStartString);
    const dtEnd = new Date(event.dtEndString);
    const tzId = event.tzId ? event.tzId : DEFAULT_TZID;
    cal.createEvent({
      id: event.uid,
      start: dtStart, // start date derived by taking the dtStartString and tzid, NOT the UTC date
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

export function convertToDate(dtString: string, tzId: string) {
  return moment.tz(dtString, tzId).toDate();
}
