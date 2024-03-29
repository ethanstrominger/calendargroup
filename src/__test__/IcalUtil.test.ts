import { INewAggEvent } from "src/INewAggEvent";
import { CalendarSource } from "src/models/CalendarSource";
import {
  parseIcalText,
  getIcalTextFromAggEvents,
  getIcalTextFromAggEvent,
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
    const input: INewAggEvent = EVENT_ALL_VALUES_DEFAULT_TZID;
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

  it("parseIcalText combines events from empty list of calendars", () => {
    const aggEventSource: CalendarSource = parseIcalText([] as string[]);
    expect(aggEventSource).toBeDefined();
    expect(aggEventSource.aggEvents.length).toEqual(0);
  });

  it("parseIcalText extracts events from one calendar", () => {
    // Arrange
    const icalText = getIcalTextFromAggEvent(
      NON_DEFAULT_CALENDAR_TZID, // Calendar TZID will be different from event TZID
      EVENT_REQUIRED_VALUES_NO_TZID
    );
    // Act
    const aggEventSource: CalendarSource = parseIcalText(icalText);
    // Assert
    expect(aggEventSource).toBeDefined();
    expect(aggEventSource.aggEvents.length).toEqual(1);
  });

  it("multiple events", () => {
    const inputArray: INewAggEvent[] = getMultipleEvents();
    verifyEventsFromInputArray(inputArray);
  });

  it("repeating, all values, default timezone, contains rrule", () => {
    const input: INewAggEvent = REPEATING_EVENT_ALL_VALUES_DEFAULT_TZID;
    verifyEventFromInput(input);
  });
});
