import moment from "moment";
import { IcalObject } from "src/IcalObject";
import {
  createCalendarWithEvents,
  getIcalObjectFromText,
} from "../../IcalUtils";
import { IEventCreateInput } from "src/IEventCreateInput";
import { AggEvent } from "src/models/AggEvent";
// import { getVtimezoneComponent } from "@touch4it/ical-timezones";
// import { AggEvent } from "src/models/AggEvent";

export const berlinTzid = "Europe/Berlin";
export const londonTzid = "Europe/London";
export const newYorkTzid = "America/New_York";

export function verifyEventsFromInputArray(inputArray: IEventCreateInput[]) {
  inputArray.forEach((input) => {
    verifyEventFromInput(input);
  });
}

export function expectObjectToBeSimilar(
  baseObject: AggEvent,
  secondObject: AggEvent
) {
  for (const key of Object.keys(baseObject)) {
    expect(`${key}: ${secondObject[key]}`).toEqual(
      `${key}: ${baseObject[key]}`
    );
  }
}

export function verifyEventFromInput(input: IEventCreateInput) {
  const expected = getExpected(input);
  const icalText = createCalendarWithEvents({
    eventData: [input],
  });
  const icalObject = getIcalObjectFromText(icalText);
  const actual = icalObject.events[0];
  expect(icalObject.events.length).toEqual(1);
  expectObjectToBeSimilar(expected, actual);
}

export function getEventAllValuesDefaultTimezone(): IEventCreateInput {
  const input = {
    uid: "X1",
    dtStartString: "2020-02-15 18:00",
    dtEndString: "2020-02-15 21:00",
    dtStamp: new Date("2020-02-15 15:00:03"),
    created: new Date("2020-02-15 14:00:01"),
    tzId: DEFAULT_TZID,
    location: "2030 Mass Ave, Lexington, MA",
    summary: "Sample Event",
  };
  return input;
}

const DEFAULT_TZID = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

export function getEventAllValuesNonDefaultTimezone(): IEventCreateInput {
  const nonDefaultTzid =
    DEFAULT_TZID === newYorkTzid ? berlinTzid : newYorkTzid;
  const input = {
    uid: "X1",
    dtStartString: "2020-02-15 18:00",
    dtEndString: "2020-02-15 21:00",
    dtStamp: new Date("2020-02-15 15:00:03"),
    created: new Date("2020-02-15 14:00:01"),
    tzId: nonDefaultTzid,
    location: "2030 Mass Ave, Lexington, MA",
    summary: "Sample Event",
  };
  return input;
}

export function getEventAllValuesNoTimezone(): IEventCreateInput {
  const input = {
    uid: "X1",
    dtStartString: "2020-02-15 18:00",
    dtEndString: "2020-02-15 21:00",
    dtStamp: new Date("2020-02-15 15:00:03"),
    created: new Date("2020-02-15 14:00:01"),
    location: "2030 Mass Ave, Lexington, MA",
    summary: "Sample Event",
  };
  return input;
}
export function getEventRequiredValuesNoTimezone(): IEventCreateInput {
  const input = {
    uid: "X1",
    dtStartString: "2020-02-15 18:00",
    dtEndString: "2020-02-15 21:00",
    summary: "Sample Event",
  };

  const expected: AggEvent = getExpected(input);

  return input;
}

function getExpected(inputEvent: IEventCreateInput): AggEvent {
  const tzId = inputEvent.tzId ? inputEvent.tzId : DEFAULT_TZID;
  const expected = {
    uid: inputEvent.uid,
    dtStart: moment.tz(inputEvent.dtStartString, tzId).toDate(),
    dtEnd: moment.tz(inputEvent.dtEndString, tzId).toDate(),
    tzid: tzId,
    created: inputEvent.created,
    summary: inputEvent.summary,
    location: inputEvent.location,
  };
  for (const key in Object.keys(expected)) {
    if (!expected[key]) {
      delete expected[key];
    }
  }

  return expected;
}

export function getMultipleEvents(): IEventCreateInput[] {
  return [
    getEventAllValuesDefaultTimezone(),
    getEventAllValuesNoTimezone(),
    getEventAllValuesNoTimezone(),
    getEventRequiredValuesNoTimezone(),
  ];
}
