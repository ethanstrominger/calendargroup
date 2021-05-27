import icalGenerator /* ical */ from "ical-generator";
import moment from "moment";
import { IcalObject } from "src/IcalObject";
import { AggEvent } from "src/models/AggEvent";
// import { getVtimezoneComponent } from "@touch4it/ical-timezones";
// import { AggEvent } from "src/models/AggEvent";

export const berlinTzid = "Europe/Berlin";
export const londonTzid = "Europe/London";
export const newYorkTzid = "America/New_York";

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

export function expectObjectArrayToBeTheSame(
  inputExpectedEvents: { input: IEventCreateInput[]; expected: AggEvent[] },
  icalObject: IcalObject
) {
  inputExpectedEvents.expected.forEach((expectedEvent, index) => {
    expectObjectToBeSame(expectedEvent, icalObject, index);
  });
}

export function expectObjectToBeSame(
  expectedEvent: AggEvent,
  icalObject: IcalObject,
  index: number
) {
  for (const key of Object.keys(expectedEvent)) {
    expect(`${key}: ${icalObject.events[index][key]}`).toEqual(
      `${key}: ${expectedEvent[key]}`
    );
  }
}

export function getEventAllValuesDefaultTimezone(): {
  input: IEventCreateInput[];
  expected: AggEvent[];
} {
  const defaultTzid = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.toString();
  const input = [
    {
      uid: "X1",
      dtStartString: "2020-02-15 18:00",
      dtEndString: "2020-02-15 21:00",
      dtStamp: new Date("2020-02-15 15:00:03"),
      created: new Date("2020-02-15 14:00:01"),
      tzId: defaultTzid,
      location: "2030 Mass Ave, Lexington, MA",
      summary: "Sample Event",
    },
  ];
  const expected: AggEvent[] = input.map((inputEvent) => {
    console.log(
      "*** debug! ***",
      moment.tz(inputEvent.dtStartString, inputEvent.tzId).toDate()
    );
    return getExpected(inputEvent);
  });

  return {
    expected: expected,
    input: input,
  };
}

function getExpected(inputEvent: IEventCreateInput): AggEvent {
  return {
    uid: inputEvent.uid,
    dtStart: moment.tz(inputEvent.dtStartString, inputEvent.tzId).toDate(),
    dtEnd: moment.tz(inputEvent.dtEndString, inputEvent.tzId).toDate(),
    tzid: inputEvent.tzId,
    dtStamp: inputEvent.dtStamp,
    created: inputEvent.created,
    summary: inputEvent.summary,
    location: inputEvent.location,
  };
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
