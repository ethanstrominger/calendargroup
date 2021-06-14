import { getIcalTextFromEvents } from "../IcalUtils";
import { getMultipleEvents, verifyEventFromInput, verifyEventsFromInputArray, } from "./test-helper/IcalTestHelper";
import { EVENT_ALL_VALUES_DEFAULT_TZID, EVENT_ALL_VALUES_NON_DEFAULT_TZID, EVENT_ALL_VALUES_NO_TZID, EVENT_REQUIRED_VALUES_NO_TZID, NON_DEFAULT_CALENDAR_TZID, } from "./test-helper/IcalTestConstants";
describe("Events", () => {
    it("non-repeating, all values, default timezone", () => {
        const input = EVENT_ALL_VALUES_DEFAULT_TZID;
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
        const inputArray = getMultipleEvents();
        const icalText = getIcalTextFromEvents({
            calendarTzid: NON_DEFAULT_CALENDAR_TZID,
            eventData: inputArray,
        });
        verifyEventsFromInputArray(inputArray);
    });
});
