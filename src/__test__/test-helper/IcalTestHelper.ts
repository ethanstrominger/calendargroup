import {
  getIcalTextFromAggEvents,
  parseIcalText,
  convertToDate,
  consoleDebug,
} from "src/IcalUtils";
import { INewAggEvent } from "src/INewAggEvent";
import { AggEvent } from "src/models/AggEvent";
import {
  DEFAULT_TZID,
  EVENT_ALL_VALUES_DEFAULT_TZID,
  EVENT_ALL_VALUES_NON_DEFAULT_TZID,
  EVENT_ALL_VALUES_NO_TZID,
  EVENT_REQUIRED_VALUES_NO_TZID,
  NON_DEFAULT_CALENDAR_TZID,
} from "./IcalTestConstants";

export function verifyEventsFromInputArray(newAggEvents: INewAggEvent[]) {
  const icalText = getIcalTextFromAggEvents(
    NON_DEFAULT_CALENDAR_TZID,
    newAggEvents
  );
  const aggEventSource = parseIcalText(icalText);
  newAggEvents.forEach((newAggEvent) => {
    const actual: AggEvent = aggEventSource.getEventByUid(newAggEvent.uid);
    const expected: AggEvent = getExpectedEvent(newAggEvent);
    consoleDebug("expected multiple object", expected);
    consoleDebug("actual multiple object", actual);
    expectObjectToBeSimilar(expected, actual);

    verifyEventFromInput(newAggEvent);
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

export function expectObjectsToBeSimilar(
  baseObjects: AggEvent[],
  secondObjects: AggEvent[]
) {
  baseObjects.forEach((baseObject, i) => {
    const secondObject = secondObjects[i];
    expectObjectToBeSimilar(baseObject, secondObject);
  });
}

export function makeTestIcalText(newAggEvents: INewAggEvent[] | INewAggEvent) {
  const newAggEventsArray = Array.isArray(newAggEvents)
    ? newAggEvents
    : [newAggEvents];
  return getIcalTextFromAggEvents(
    NON_DEFAULT_CALENDAR_TZID, // Calendar TZID will be different from event TZID
    newAggEventsArray
  );
}

export function verifyEventFromInput(newAggEvents: INewAggEvent) {
  const icalText = makeTestIcalText(newAggEvents);
  const expected: AggEvent = getExpectedEvent(newAggEvents);
  return verifyEventFromIcalText(icalText, expected);
}

export function verifyEventFromIcalText(
  icalText: string,
  expected: AggEvent[] | AggEvent
) {
  const expectedArray = Array.isArray(expected) ? expected : [expected];
  const aggEventSource = parseIcalText(icalText);
  const actual: AggEvent = aggEventSource.aggEvents[0];
  expect(aggEventSource.aggEvents.length).toEqual(1);
  expectObjectToBeSimilar(expectedArray[0], actual);
}

function getExpectedEvent(newAggEvent: INewAggEvent): AggEvent {
  const tzId = newAggEvent.tzId ? newAggEvent.tzId : DEFAULT_TZID;

  // JavaScript has no native Date/Timezone type, only a Date type
  // JavaScript date functions set and get values based on default timezone
  // moment.tz sets date values based on a date string and a specific timezone
  // todo: refactor (create convert func)
  const expected = {
    uid: newAggEvent.uid,
    dtStart: convertToDate(newAggEvent.dtStartString, tzId),
    dtEnd: convertToDate(newAggEvent.dtEndString, tzId),
    tzid: tzId,
    created: newAggEvent.created,
    summary: newAggEvent.summary,
    location: newAggEvent.location,
    rrule: newAggEvent.rrule,
  };

  // refactor (remove empty keys func)
  for (const key in Object.keys(expected)) {
    if (!expected[key]) {
      delete expected[key];
    }
  }

  return expected;
}

export function getMultipleEvents(): INewAggEvent[] {
  return [
    EVENT_ALL_VALUES_DEFAULT_TZID,
    EVENT_ALL_VALUES_NON_DEFAULT_TZID,
    EVENT_ALL_VALUES_NO_TZID,
    EVENT_REQUIRED_VALUES_NO_TZID,
  ];
}
