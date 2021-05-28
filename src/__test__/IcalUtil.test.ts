import { createCalendarWithEvents, getIcalObjectFromText } from "../IcalUtils";
import { IEventCreateInput } from "src/IEventCreateInput";
import {
  getEventAllValuesDefaultTimezone,
  getEventAllValuesNonDefaultTimezone,
  getEventAllValuesNoTimezone,
  getEventRequiredValuesNoTimezone,
  getMultipleEvents,
  verifyEventFromInput,
  verifyEventsFromInputArray,
} from "./test-helper/IcalTestHelper";
import { IcalObject } from "../IcalObject";

describe("Events", () => {
  it("non-repeating, all values, default timezone", () => {
    const input: IEventCreateInput = getEventAllValuesDefaultTimezone();
    verifyEventFromInput(input);
  });

  it("non-repeating, all values, non-default timezone", () => {
    const input = getEventAllValuesNonDefaultTimezone();
    verifyEventFromInput(input);
  });

  it("non-repeating, all values, no timezone", () => {
    const input = getEventAllValuesNoTimezone();
    verifyEventFromInput(input);
  });

  it("non-repeating, required values, no timezone", () => {
    const input = getEventRequiredValuesNoTimezone();
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
