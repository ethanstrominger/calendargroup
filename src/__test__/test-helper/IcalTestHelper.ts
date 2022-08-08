import {
  getIcalTextFromAggEvents,
  parseIcalTexts,
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
  const calendarSource = parseIcalTexts(icalText);
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
  console.log("newAggEvent 1", newAggEvent.dtStart, newAggEvent.tzid);
  const icalText = makeTestIcalText(newAggEvent);
  console.log("newAggEvent 2", newAggEvent.dtStart, newAggEvent.tzid);
  const expected: AggEvent = getExpectedEvent(newAggEvent);
  console.log("debug ical", expected.dtStart, icalText);

  console.log("expected", expected.dtStart, expected.tzid);
  return verifyEventFromIcalText(icalText, expected);
}

export function verifyEventFromIcalText(
  icalText: string,
  expected: AggEvent[] | AggEvent
) {
  const expectedArray = Array.isArray(expected) ? expected : [expected];
  const calendarSource = parseIcalTexts(icalText);
  const actual: AggEvent = calendarSource.aggEvents[0];
  expect(calendarSource.aggEvents.length).toEqual(1);
  console.log(
    "debug verify",
    icalText,
    actual.dtStart,
    actual.tzid,
    "\n",
    expectedArray[0].dtStart,
    expectedArray[0].tzid
  );
  expectObjectToBeSimilar(expectedArray[0], actual);
}

export function getExpectedEvent(newAggEvent: AggEvent): AggEvent {
  const tzid = newAggEvent.tzid ? newAggEvent.tzid : DEFAULT_TZID;
  console.log("get expected event", newAggEvent.dtStart, newAggEvent.tzid);

  const expected = {
    uid: newAggEvent.uid,
    dtStart: newAggEvent.dtStart,
    dtEnd: newAggEvent.dtEnd,
    tzid: tzid,
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
