import {
  getIcalTextFromEvents,
  getEventDataFromText,
  convertToDate,
  consoleDebug,
} from "../../IcalUtils";
import { IParamsToCreateEvent } from "src/IParamsToCreateEvent";
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

export function verifyEventsFromInputArray(params: IParamsToCreateEvent[]) {
  const icalText = getIcalTextFromEvents(NON_DEFAULT_CALENDAR_TZID, params);
  const eventSource = getEventDataFromText(icalText);
  params.forEach((eventParams) => {
    const actual: AggEvent = eventSource.eventsWithKeys[eventParams.uid];
    const expected: AggEvent = getExpected(eventParams);
    consoleDebug("expected multiple object", expected);
    consoleDebug("actual multiple object", actual);
    expectObjectToBeSimilar(expected, actual);

    verifyEventFromInput(eventParams);
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

export function verifyEventFromInput(params: IParamsToCreateEvent) {
  const icalText = getIcalTextFromEvents(
    NON_DEFAULT_CALENDAR_TZID, // Calendar TZID will be different from event TZID
    [params]
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

function getExpected(params: IParamsToCreateEvent): AggEvent {
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

export function getMultipleEvents(): IParamsToCreateEvent[] {
  return [
    EVENT_ALL_VALUES_DEFAULT_TZID,
    EVENT_ALL_VALUES_NON_DEFAULT_TZID,
    EVENT_ALL_VALUES_NO_TZID,
    EVENT_REQUIRED_VALUES_NO_TZID,
  ];
}
