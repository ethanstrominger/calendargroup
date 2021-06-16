import { IEventCreateInput } from "src/IEventCreateInput";
import { IcalObject } from "../IcalObject";
import { parseIcalTextArray, getIcalTextFromEvents } from "../IcalUtils";
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
import { AggEvent } from "src/models/AggEvent";



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

  it("getIcalObjectFromTexts combines events from empty list of calendars", () => {
    const icalObject: IcalObject = parseIcalTextArray( [] as string[]);
    expect(icalObject).toBeDefined();
    expect(icalObject.events.length).toEqual(0);
  });
  
  // icalUtil.getIcalObjectFromTexts([icalText1, icalText2, icalText3]) 
  // combines events from all three calendars.
  it("getIcalObjectFromTexts extracts events from one calendar", () => {
    const icalText = getIcalTextFromEvents({
      calendarTzid: NON_DEFAULT_CALENDAR_TZID, // Calendar TZID will be different from event TZID
      eventData: [EVENT_REQUIRED_VALUES_NO_TZID],
    })
     const icalObject: IcalObject = parseIcalTextArray( [icalText] );
    expect(icalObject).toBeDefined();
    expect(icalObject.events.length).toEqual(1);
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
