import { AggEventSource } from "./models/AggEventSource";
import { DateWithTimeZone, sync } from "node-ical";
import icalGenerator from "ical-generator";
import { INewAggEvent } from "./INewAggEvent";
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

/**
 * Test
 * @param calendarTzid
 * @returns an empty icalObject
 */
function createEmptyIcal(calendarTzid: string) {
  const icalObject = icalGenerator({});
  // icalObject.timezone with getVTimezoneComponent ensures timezone details created for
  // the event timezones.
  icalObject.timezone({ name: calendarTzid, generator: getVtimezoneComponent });
  return icalObject;
}

/**
 * Gets the icalText for a calendar with a single event
 * based on a single specificied event (JSON object)
 * @param calendarTzid timezone
 * @param newAggEvent JSON object
 * @returns iCal text for a calendar that includes the specified event
 */
export function getIcalTextFromAggEvent(
  calendarTzid: string,
  newAggEvent: INewAggEvent
) {
  return getIcalTextFromAggEvents(calendarTzid, [newAggEvent]);
}

/**
 * Gets the icalText for a calendar with events
 * based on an array of specificied events (JSON object)
 * @param calendarTzid timezone
 * @param newAggEvent JSON object
 * @returns ical text
 */
export function getIcalTextFromAggEvents(
  calendarTzid: string,
  newAggEvents: INewAggEvent[]
) {
  const icalObject = createEmptyIcal(calendarTzid);

  newAggEvents.forEach((event) => {
    addAggEventToIcalObj(icalObject, event);
  });
  return icalObject.toString();
}

function addAggEventToIcalObj(icalObject, event: INewAggEvent) {
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
  icalObject.createEvent({
    id: event.uid,
    start: new Date(event.dtStartString),
    end: new Date(event.dtEndString),
    timezone: event.tzId ? event.tzId : DEFAULT_TZID,
    summary: event.summary,
    created: event.created,
    stamp: event.dtStamp,
    location: event.location,
    repeating: event.rrule,
  });
}

export function consoleDebug(m1: string, m2?: any, m3?: any) {
  // if (doConsoleLog || m1 === consoleLogString) {
  console.log(m1, m2, m3);
  // }
}

/**
 * Create event source from multiple ical formated calendars
 * @param icalTexts
 * @returns an aggEventSource which includes all the events from all the icalTexts
 */
export function parseIcalTextArray(icalTexts: string[]) {
  const events: AggEvent[] = [];
  icalTexts.forEach((icalText) => {
    const tempEventData = parseIcalText(icalText);
    events.push(...tempEventData.aggEvents);
  });
  const aggEventSource = new AggEventSource("Ethan", "file", "xyz.txt");
  aggEventSource.addAggEvents(events);
  return aggEventSource;
}

/**
 *
 * @param icalText
 * @returns an agg event source with agg events attached
 */
export function parseIcalText(icalText: string): AggEventSource {
  const icalData = sync.parseICS(icalText);
  const aggEventSource = new AggEventSource("Ethan", "file", "xyz.txt");
  for (const parsedEvent of Object.values(icalData).filter(
    (obj) => obj.type == "VEVENT"
  )) {
    aggEventSource.addAggEvent({
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
  return aggEventSource;
}

export function convertToDate(dtString: string, tzId: string) {
  return moment.tz(dtString, tzId).toDate();
}
