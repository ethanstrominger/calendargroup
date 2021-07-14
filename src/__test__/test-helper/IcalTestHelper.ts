import {
  getIcalTextFromEvents,
  getEventDataFromText,
  convertToDate,
  consoleDebug,
} from "src/IcalUtils";
import { INewEvent } from "src/INewEvent";
import { AggEvent } from "src/models/AggEvent";
import {
  DEFAULT_TZID,
  EVENT_ALL_VALUES_DEFAULT_TZID,
  EVENT_ALL_VALUES_NON_DEFAULT_TZID,
  EVENT_ALL_VALUES_NO_TZID,
  EVENT_REQUIRED_VALUES_NO_TZID,
  NON_DEFAULT_CALENDAR_TZID,
} from "./IcalTestConstants";

export function verifyEventsFromInputArray(newEvents: INewEvent[]) {
  const icalText = getIcalTextFromEvents(NON_DEFAULT_CALENDAR_TZID, newEvents);
  const eventSource = getEventDataFromText(icalText);
  newEvents.forEach((newEvent) => {
    const actual: AggEvent = eventSource.getEventByUid(newEvent.uid);
    const expected: AggEvent = getExpectedEvent(newEvent);
    consoleDebug("expected multiple object", expected);
    consoleDebug("actual multiple object", actual);
    expectObjectToBeSimilar(expected, actual);

    verifyEventFromInput(newEvent);
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
  consoleDebug("baseObject", baseObject);
  consoleDebug("secondObject", secondObject);
  for (const key of Object.keys(baseObject)) {
    expect(`${key}: ${secondObject[key]}`).toEqual(
      `${key}: ${baseObject[key]}`
    );
  }
}

export function makeTestIcalText(newEvents: INewEvent[] | INewEvent) {
  const newEventsArray = Array.isArray(newEvents) ? newEvents : [newEvents];
  return getIcalTextFromEvents(
    NON_DEFAULT_CALENDAR_TZID, // Calendar TZID will be different from event TZID
    newEventsArray
  );
}

export function verifyEventFromInput(newEvents: INewEvent) {
  const icalText = makeTestIcalText(newEvents);
  consoleDebug("*** ICAL TEXT ***", icalText);
  const eventSource = getEventDataFromText(icalText);
  const actual: AggEvent = eventSource.aggEvents[0];
  const expected: AggEvent = getExpectedEvent(newEvents);
  expect(eventSource.aggEvents.length).toEqual(1);
  consoleDebug("expected object", expected);
  consoleDebug("actual object");
  expectObjectToBeSimilar(expected, actual);
}

function getExpectedEvent(newEvent: INewEvent): AggEvent {
  const tzId = newEvent.tzId ? newEvent.tzId : DEFAULT_TZID;

  // JavaScript has no native Date/Timezone type, only a Date type
  // JavaScript date functions set and get values based on default timezone
  // moment.tz sets date values based on a date string and a specific timezone
  // todo: refactor (create convert func)
  const expected = {
    uid: newEvent.uid,
    dtStart: convertToDate(newEvent.dtStartString, tzId),
    dtEnd: convertToDate(newEvent.dtEndString, tzId),
    tzid: tzId,
    created: newEvent.created,
    summary: newEvent.summary,
    location: newEvent.location,
    rrule: newEvent.rrule,
  };

  // refactor (remove empty keys func)
  for (const key in Object.keys(expected)) {
    if (!expected[key]) {
      delete expected[key];
    }
  }

  return expected;
}

export function getMultipleEvents(): INewEvent[] {
  return [
    EVENT_ALL_VALUES_DEFAULT_TZID,
    EVENT_ALL_VALUES_NON_DEFAULT_TZID,
    EVENT_ALL_VALUES_NO_TZID,
    EVENT_REQUIRED_VALUES_NO_TZID,
  ];
}
