import { getIcalTextFromEvents, getIcalObjectFromText } from "../IcalUtils";
import { IEventCreateInput } from "src/IEventCreateInput";
import {
  getMultipleEvents,
  verifyEventFromInput,
  verifyEventsFromInputArray,
} from "./test-helper/IcalTestHelper";
import {
  EVENT_ALL_VALUES_DEFAULT_TZID,
  EVENT_ALL_VALUES_NON_DEFAULT_TZID,
  EVENT_ALL_VALUES_NO_TZID,
  EVENT_REQUIRED_VALUES_NO_TZID,
  LOS_ANGELES_TZID,
  NON_DEFAULT_CALENDAR_TZID,
  REPEATING_EVENT_ALL_VALUES_DEFAULT_TZID,
} from "./test-helper/IcalTestConstants";

import { IcalObject } from "../IcalObject";

describe("Events", () => {
  it("non-repeating, all values, default timezone", () => {
    const input: IEventCreateInput = EVENT_ALL_VALUES_DEFAULT_TZID;
    verifyEventFromInput(input);
  });

  it("non-repeating, all values, non-default timezone", () => {
    const input = EVENT_ALL_VALUES_NON_DEFAULT_TZID;
    verifyEventFromInput(input);
  });

  it("non-repeating, all values, no timezone", () => {
    const input = EVENT_ALL_VALUES_NO_TZID;
    verifyEventFromInput(input);
  });

  it("non-repeating, required values, no timezone", () => {
    const input = EVENT_REQUIRED_VALUES_NO_TZID;
    verifyEventFromInput(input);
  });

  it.skip("multiple events", () => {
    const inputArray: IEventCreateInput[] = getMultipleEvents();
    verifyEventsFromInputArray(inputArray);
  });

  it.skip("repeating, all values, default timezone, contains rrule", () => {
    const input: IEventCreateInput = REPEATING_EVENT_ALL_VALUES_DEFAULT_TZID;
    verifyEventFromInput(input);
  });
});
