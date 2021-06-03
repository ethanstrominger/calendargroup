import moment from "moment";
import {
  createCalendarWithEvents as getIcalTextFromEvents,
  getIcalObjectFromText,
} from "../../IcalUtils";
import { IEventCreateInput } from "src/IEventCreateInput";
import { AggEvent } from "src/models/AggEvent";
import {
  DEFAULT_TZID,
  EVENT_ALL_VALUES_DEFAULT_TZID,
  EVENT_ALL_VALUES_NON_DEFAULT_TZID,
  EVENT_ALL_VALUES_NO_TZID,
  EVENT_REQUIRED_VALUES_NO_TZID,
  LOS_ANGELES_TZID,
  NON_DEFAULT_CALENDAR_TZID,
} from "./IcalTestConstants";
// import { getVtimezoneComponent } from "@touch4it/ical-timezones";
// import { AggEvent } from "src/models/AggEvent";

export function verifyEventsFromInputArray(inputArray: IEventCreateInput[]) {
  inputArray.forEach((input) => {
    verifyEventFromInput(input);
  });
}

/**
 * Asserts that all key-value pairs in the baseObject equal the key-value pairs in the secondObject.
 * Ignores keys in secondObject that are not in the baseObject.
 * @param baseObject 
 * @param secondObject 
 */
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

export function verifyEventFromInput(inputEvent: IEventCreateInput) {
  const icalText = getIcalTextFromEvents({
    calendarTzid: NON_DEFAULT_CALENDAR_TZID, // Calendar TZID will be different from event TZID
    eventData: [inputEvent],
  });
  const icalObject = getIcalObjectFromText(icalText);
  const actual : AggEvent = icalObject.events[0];
  const expected : AggEvent = getExpected(inputEvent);
  expect(icalObject.events.length).toEqual(1);
  expectObjectToBeSimilar(expected, actual);
}

function getExpected(inputEvent: IEventCreateInput): AggEvent {
  const tzId = inputEvent.tzId ? inputEvent.tzId : DEFAULT_TZID;

  // JavaScript has no native Date/Timezone type, only a Date type
  // JavaScript date functions set and get values based on default timezone
  // moment.tz sets date values based on a date string and a specific timezone
  // todo: refactor (create convert func)

  const expected = {
    uid: inputEvent.uid,
    dtStart: convertToDate(inputEvent.dtStartString, tzId), 
    dtEnd: convertToDate(inputEvent.dtEndString, tzId),
    tzid: tzId,
    created: inputEvent.created,
    summary: inputEvent.summary,
    location: inputEvent.location,
  };
  // refactor (remove empty keys func)
  for (const key in Object.keys(expected)) {
    if (!expected[key]) {
      delete expected[key];
    }
  }

  return expected;
}

export function getMultipleEvents(): IEventCreateInput[] {
  return [
    EVENT_ALL_VALUES_DEFAULT_TZID,
    EVENT_ALL_VALUES_NON_DEFAULT_TZID,
    EVENT_ALL_VALUES_NO_TZID,
    EVENT_REQUIRED_VALUES_NO_TZID,
  ];
}
function convertToDate(dtString: string, tzId: string) {
  return moment.tz(dtString, tzId).toDate();
}

