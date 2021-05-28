import moment from "moment";
import {
  createCalendarWithEvents,
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
  const expected = getExpected(inputEvent);
  const icalText = createCalendarWithEvents({
    calendarTzid: NON_DEFAULT_CALENDAR_TZID,
    eventData: [inputEvent],
  });
  const icalObject = getIcalObjectFromText(icalText);
  const actual = icalObject.events[0];
  expect(icalObject.events.length).toEqual(1);
  expectObjectToBeSimilar(expected, actual);
}

function getExpected(inputEvent: IEventCreateInput): AggEvent {
  const tzId = inputEvent.tzId ? inputEvent.tzId : DEFAULT_TZID;

  // JavaScript has no native Date/Timezone type, only a Date type
  // JavaScript date functions set and get values based on default timezone
  // moment.tz sets date values based on a date string and a specific timezone
  const dtStartWithTimezone = moment.tz(inputEvent.dtStartString, tzId);
  const dtEndWithTimezone = moment.tz(inputEvent.dtEndString, tzId);

  const expected = {
    uid: inputEvent.uid,
    dtStart: dtStartWithTimezone.toDate(),
    dtEnd: dtEndWithTimezone.toDate(),
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
    EVENT_ALL_VALUES_DEFAULT_TZID,
    EVENT_ALL_VALUES_NON_DEFAULT_TZID,
    EVENT_ALL_VALUES_NO_TZID,
    EVENT_REQUIRED_VALUES_NO_TZID,
  ];
}
