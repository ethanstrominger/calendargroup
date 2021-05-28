import { createCalendarWithEvents, getIcalObjectFromText } from "../IcalUtils";
import { IEventCreateInput } from "src/IEventCreateInput";
import {
  EVENT_ALL_VALUES_DEFAULT_TZID,
  EVENT_ALL_VALUES_NON_DEFAULT_TZID,
  EVENT_ALL_VALUES_NO_TZID,
  EVENT_REQUIRED_VALUES_NO_TZID,
  getMultipleEvents,
  verifyEventFromInput,
  verifyEventsFromInputArray,
} from "./test-helper/IcalTestHelper";
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

  it("multiple events", () => {
    const inputArray: IEventCreateInput[] = getMultipleEvents();

    const icalText = createCalendarWithEvents({
      eventData: inputArray,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);

    verifyEventsFromInputArray(inputArray);
  });
});
