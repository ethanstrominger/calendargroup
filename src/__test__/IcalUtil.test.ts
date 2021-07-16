import { INewEvent } from "src/INewEvent";
import { AggEventSource } from "src/models/AggEventSource";
import {
  parseIcalTextArray,
  getIcalTextFromEvents,
  getIcalTextFromEvent,
} from "src/IcalUtils";
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
  NON_DEFAULT_CALENDAR_TZID,
  REPEATING_EVENT_ALL_VALUES_DEFAULT_TZID,
} from "./test-helper/IcalTestConstants";

describe("Events", () => {
  it("non-repeating, all values, default timezone", () => {
    const input: INewEvent = EVENT_ALL_VALUES_DEFAULT_TZID;
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

  it("parseIcalTextArray combines events from empty list of calendars", () => {
    const eventSource: AggEventSource = parseIcalTextArray([] as string[]);
    expect(eventSource).toBeDefined();
    expect(eventSource.aggEvents.length).toEqual(0);
  });

  it("parseIcalTextArray extracts events from one calendar", () => {
    // Arrange
    const icalText = getIcalTextFromEvent(
      NON_DEFAULT_CALENDAR_TZID, // Calendar TZID will be different from event TZID
      EVENT_REQUIRED_VALUES_NO_TZID
    );
    // Act
    const eventSource: AggEventSource = parseIcalTextArray([icalText]);
    // Assert
    expect(eventSource).toBeDefined();
    expect(eventSource.aggEvents.length).toEqual(1);
  });

  it("multiple events", () => {
    const inputArray: INewEvent[] = getMultipleEvents();
    verifyEventsFromInputArray(inputArray);
  });

  it.skip("repeating, all values, default timezone, contains rrule", () => {
    const input: INewEvent = REPEATING_EVENT_ALL_VALUES_DEFAULT_TZID;
    verifyEventFromInput(input);
  });
});
