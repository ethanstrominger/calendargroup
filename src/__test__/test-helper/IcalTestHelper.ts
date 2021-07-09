import {
  getIcalTextFromEvents,
  getEventDataFromText,
  convertToDate,
  consoleDebug,
} from "src/IcalUtils";
import { IEventCreationParams } from "../../IEventCreationParams";
import { AggEvent } from "../../models/AggEvent";
import {
  DEFAULT_TZID,
  EVENT_ALL_VALUES_DEFAULT_TZID,
  EVENT_ALL_VALUES_NON_DEFAULT_TZID,
  EVENT_ALL_VALUES_NO_TZID,
  EVENT_REQUIRED_VALUES_NO_TZID,
  NON_DEFAULT_CALENDAR_TZID,
} from "./IcalTestConstants";

export function verifyEventsFromInputArray(
  paramsArray: IEventCreationParams[]
) {
  const icalText = getIcalTextFromEvents(
    NON_DEFAULT_CALENDAR_TZID,
    paramsArray
  );
  const eventSource = getEventDataFromText(icalText);
  paramsArray.forEach((params) => {
    const actual: AggEvent = eventSource.eventsWithKeys[params.uid];
    const expected: AggEvent = getExpected(params);
    consoleDebug("expected multiple object", expected);
    consoleDebug("actual multiple object", actual);
    expectObjectToBeSimilar(expected, actual);

    verifyEventFromInput(params);
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

export function verifyEventFromInput(params: IEventCreationParams) {
  const icalText = getIcalTextFromEvents(
    NON_DEFAULT_CALENDAR_TZID, // Calendar TZID will be different from event TZID
    params
  );
  consoleDebug("*** ICAL TEXT ***", icalText);
  const eventSource = getEventDataFromText(icalText);
  const actual: AggEvent = eventSource.aggEvents[0];
  const expected: AggEvent = getExpected(params);
  expect(eventSource.aggEvents.length).toEqual(1);
  consoleDebug("expected object", expected);
  consoleDebug("actual object");
  expectObjectToBeSimilar(expected, actual);
}

function getExpected(params: IEventCreationParams): AggEvent {
  const tzId = params.tzId ? params.tzId : DEFAULT_TZID;

  // JavaScript has no native Date/Timezone type, only a Date type
  // JavaScript date functions set and get values based on default timezone
  // moment.tz sets date values based on a date string and a specific timezone
  // todo: refactor (create convert func)

  const expected = {
    uid: params.uid,
    dtStart: convertToDate(params.dtStartString, tzId),
    dtEnd: convertToDate(params.dtEndString, tzId),
    tzid: tzId,
    created: params.created,
    summary: params.summary,
    location: params.location,
    rrule: params.rrule,
  };
  // refactor (remove empty keys func)
  for (const key in Object.keys(expected)) {
    if (!expected[key]) {
      delete expected[key];
    }
  }

  return expected;
}

export function getMultipleEvents(): IEventCreationParams[] {
  return [
    EVENT_ALL_VALUES_DEFAULT_TZID,
    EVENT_ALL_VALUES_NON_DEFAULT_TZID,
    EVENT_ALL_VALUES_NO_TZID,
    EVENT_REQUIRED_VALUES_NO_TZID,
  ];
}
