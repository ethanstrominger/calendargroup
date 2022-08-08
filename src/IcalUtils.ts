import { CalendarSource } from "./models/CalendarSource";
import { DateWithTimeZone, sync } from "node-ical";
import icalGenerator from "ical-generator";
import { INewAggEvent } from "./INewAggEvent";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import moment from "moment";
import dotenv from "dotenv";
import { AggEvent } from "./models/AggEvent";
import { DateTime } from "luxon";

dotenv.config();
const consoleLogString = process.env.CONSOLE_LOG?.toUpperCase();
const doConsoleLog = consoleLogString === "TRUE";
const DEFAULT_TZID = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

/**
 * Parse an iCalendar text string into a calendar source.
 * @param utcDateTime Format is
 *  utc date+T+UTC time+<space>+time zone
 * - utcdate and time must be a UTC value.  For instance, using America/Los_Angeles is UTC -7:
 *     - 20220830T220000 America/Los_Angeles => 2022-08-30 15:00:00 America/Los_Angeles on calendar
 *     - 20220325T020000 America/Los_Angeles => 2-22-03-24 17:00:00 America/Los_Angeles on calendar (previous day)
 * - time zone is required.  It is specified using TZ Database Time Zones format (also known as Olson or IANA time zone format).
 * America/New_York is an example.
 */
export function getDateTimeWithTimeZone(
  utcDateTime: string | Date,
  timezone: string
): DateWithTimeZone {
  if (!timezone) {
    throw new Error("timezone is required");
  }
  let retval;
  if (typeof utcDateTime == "string") {
    retval = new Date(utcDateTime);
  } else {
    retval = utcDateTime;
  }
  retval = new DateTime(retval, { zone: timezone }).toJSDate();
  retval["tzid"] = timezone;
  console.log("debug getDateTime", utcDateTime, timezone, retval);
  return retval;
}

/**
 * Test
 * @param calendarTzid
 * @returns an empty icalObject
 */
function createIcal(calendarTzid: string) {
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
  const icalObject = createIcal(calendarTzid);

  newAggEvents.forEach((event) => {
    console.log("adding", event.summary, event.dtStart, event.tzid);
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
  // - event.dtStartString = 18:00, event.tzid = Berlin.  UTC time is 17:00.  This is desired value.
  // - new Date(event.dtStartString) =>  UTC date is 23:00 (adjusted 5 hours for default timezone).
  // .   UTC date is incorrect
  // - createEvent magically sets the date of the iCalendar event to 18:00 Berlin tzid => 17:00 UTC even
  // .    though input was 23:00 UTC.
  console.log("debug dtstart", event.dtStart);
  icalObject.createEvent({
    id: event.uid,
    start: event.dtStart,
    end: event.dtEnd,
    timezone: event.tzid ? event.tzid : DEFAULT_TZID,
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
 * @returns an calendarSource which includes all the events from all the icalTexts
 */
export function parseIcalTexts(icalTexts: string[] | string) {
  let icalTextsArray: string[];
  if (typeof icalTexts === "string") {
    icalTextsArray = [icalTexts as string];
  } else {
    icalTextsArray = icalTexts as string[];
  }
  const events: AggEvent[] = [];
  icalTextsArray.forEach((icalText) => {
    const tempEventData = _parseSingleICalText(icalText);
    events.push(...tempEventData.aggEvents);
  });
  const calendarSource = new CalendarSource("Ethan", "file", "xyz.txt");
  calendarSource.addAggEvents(events);
  return calendarSource;
}

/**
 *
 * @param icalText
 * @returns a calendar source with agg events attached
 */
function _parseSingleICalText(icalText: string): CalendarSource {
  const icalData = sync.parseICS(icalText);
  const calendarSource = new CalendarSource("Ethan", "file", "xyz.txt");
  for (const parsedEvent of Object.values(icalData).filter(
    (obj) => obj.type == "VEVENT"
  )) {
    console.log(
      "debug loop",
      parsedEvent.summary,
      "start:",
      parsedEvent.start,
      new Date(parsedEvent.start.toString())
    );
    calendarSource.addAggEvent({
      uid: parsedEvent.uid.toString(),
      dtStart: new Date(parsedEvent.start.toString()),
      dtEnd: new Date(parsedEvent.end.toString()),
      dtStamp: parsedEvent.dtstamp as Date,
      created: parsedEvent.created as Date,
      location: parsedEvent.location as string,
      summary: parsedEvent.summary as string,
      recurrenceId: parsedEvent.recurrenceid,
      rrule: parsedEvent.rrule?.toString(),
      tzid: (parsedEvent.start as DateWithTimeZone).tz,
    });
  }
  return calendarSource;
}

export function convertToDate(dtString: string, tzid: string) {
  return moment.tz(dtString, tzid).toDate();
}
function getFunnyDate(origDate: DateWithTimeZone): Date {
  const origUTCTime = origDate.getTime();
  const f = origDate.toString();
  const localOffset = origDate.getTimezoneOffset();
  // const origOffsetMilliseconds = origUTCTime - origUTCTime;
  // const origOffsetMinutes = origOffsetMilliseconds / 1000 / 60;
  const adjustedDate = new Date(origUTCTime + localOffset);
  console.log(
    "debug 2 -orig date",
    origDate.toString(),
    "UTC time",
    new Date(origDate.getTime()),
    localOffset,
    adjustedDate
  );
  return origDate;
}
