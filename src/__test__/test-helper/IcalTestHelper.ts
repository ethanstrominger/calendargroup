import {
  getIcalTextFromAggEvents,
  parseIcalText2,
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
  const calendarSource = parseIcalText2(icalText);
  newAggEvents.forEach((newAggEvent) => {
    const actual: AggEvent = calendarSource.getEventByUid(newAggEvent.uid);
    const expected: AggEvent = getExpectedEvent(newAggEvent);
    // consoleDebug("expected multiple object", expected);
    // consoleDebug("actual multiple object", actual);
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

export function verifyEventFromInput(newAggEvent: INewAggEvent) {
  const icalText = makeTestIcalText(newAggEvent);
  const lastPos = icalText.lastIndexOf("DTSTART");
  const expected: AggEvent = getExpectedEvent(newAggEvent);
  return verifyEventFromIcalText(icalText, expected);
}

export function verifyEventFromIcalText(
  icalText: string,
  expected: AggEvent[] | AggEvent
) {
  const expectedArray = Array.isArray(expected) ? expected : [expected];
  const calendarSource = parseIcalText2(icalText);
  const actual: AggEvent = calendarSource.aggEvents[0];
  expect(calendarSource.aggEvents.length).toEqual(1);
  expectObjectToBeSimilar(expectedArray[0], actual);
}

function getExpectedEvent(newAggEvent: INewAggEvent): AggEvent {
  const tzId = newAggEvent.timezone ? newAggEvent.timezone : DEFAULT_TZID;

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
