import { AggEventSource } from "./models/AggEventSource";
import { DateWithTimeZone, sync } from "node-ical";
import icalGenerator from "ical-generator";
import { IEventCreateInput } from "./IEventCreateInput";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import moment from "moment";
import dotenv from "dotenv";
import { AggEvent } from "./models/AggEvent";

dotenv.config();
const consoleLogString = process.env.CONSOLE_LOG?.toUpperCase();
const doConsoleLog = consoleLogString === "TRUE";
const DEFAULT_TZID = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

export function getIcalTextFromEvents(
  calendarTzid: string,
  inputEventData: IEventCreateInput[]
) {
  const cal = icalGenerator({});
  // cal.timezone with getVTimezoneComponent ensures timezone details created for
  // the event timezones.
  cal.timezone({ name: data.calendarTzid, generator: getVtimezoneComponent });

  data.inputEventData.forEach((event) => {
    // NOTE: ICalendar.createEvent parameters are MISLEADING.  Read below if you want to understand
    // how this works, otherwse trust the tests.  dtStart works as follows:
    //   - value for dtStart parameter is set to new Date(event.dateString) => applies the server's
    //     default format to figure out the UTC date.  This is different than the
    // .   dtString with event.tzid applied.
    //   - createEvent sets dtStart of the calendar event as follows:
    // .      - derive string value of dtStart, which happens to be the same as event.dtStartString
    //        - apply the provided tzid to that string
    //
    // Example:
    // - server default timezone is New York
    // - event.dtStartString = 18:00, event.tzId = Berlin.  UTC time is 17:00.  This is desired value.
    // - new Date(event.dtStartString) =>  UTC date is 23:00 (adjusted 5 hours for default timezone).
    // .   UTC date is incorrect
    // - createEvent magically sets the date of the iCalendar event to 18:00 Berlin tzid => 17:00 UTC even
    // .    though input was 23:00 UTC.

    cal.createEvent({
      id: event.uid,
      start: new Date(event.dtStartString), // see note above
      end: new Date(event.dtEndString), // see note above
      timezone: event.tzId ? event.tzId : DEFAULT_TZID,
      summary: event.summary,
      created: event.created,
      stamp: event.dtStamp,
      location: event.location,
      repeating: event.rrule,
    });
  });
  return cal.toString();
}

export function consoleDebug(m1: string, m2?: any, m3?: any) {
  if (doConsoleLog || m1 === consoleLogString) {
    console.log(m1, m2, m3);
  }
}

export function parseIcalTextArray(icalTexts: string[]) {
  const events: AggEvent[] = [];
  icalTexts.forEach((icalText) => {
    const tempEventData = getEventDataFromText(icalText);
    events.push(...tempEventData.aggEvents);
  });
  const eventSource = new AggEventSource("Ethan", "file", "xyz.txt");
  eventSource.addAggEvents(events);
  return eventSource;
}

export function getEventDataFromText(icalText: string): AggEventSource {
  const icalData = sync.parseICS(icalText);
  const eventSource = new AggEventSource("Ethan", "file", "xyz.txt");

  consoleDebug("icalData:", icalData);
  for (const parsedEvent of Object.values(icalData).filter(
    (obj) => obj.type == "VEVENT"
  )) {
    const rrule: any = parsedEvent.rrule;
    for (const p in rrule) {
      consoleDebug(p, rrule[p]);
    }

    consoleDebug("parsedEvent.rrule:", parsedEvent.rrule);
    eventSource.addAggEvent({
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
  return eventSource;
}

export function convertToDate(dtString: string, tzId: string) {
  return moment.tz(dtString, tzId).toDate();
}
