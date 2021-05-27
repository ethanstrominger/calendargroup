import { createCalendarWithEvents, getIcalObjectFromText } from "../IcalUtils";
import { IEventCreateInput } from "src/IEventCreateInput";
import {
  berlinTzid,
  expectObjectArrayToBeTheSame,
  getEventAllValuesDefaultTimezone,
  getEventAllValuesNoTimezone,
  getEventRequiredValuesNoTimezone,
  newYorkTzid,
} from "./test-helper/IcalTestHelper";
import { IcalObject } from "../IcalObject";
import { AggEvent } from "src/models/AggEvent";
import moment, { defineLocale } from "moment-timezone";

function addHoursToDate(date: Date, hours: number) {
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  return new Date(date.getHours() + hours);
}

describe("Events", () => {
  it("non-repeating, all values, default timezone", () => {
    const inputExpectedEvents: {
      input: IEventCreateInput[];
      expected: AggEvent[];
    } = getEventAllValuesDefaultTimezone();

    const icalText = createCalendarWithEvents({
      eventData: inputExpectedEvents.input,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.events.length).toEqual(1);

    expectObjectArrayToBeTheSame(inputExpectedEvents, icalObject);
  });

  it("non-repeating, all values, non-default timezone", () => {
    const inputExpectedEvents: {
      input: IEventCreateInput[];
      expected: AggEvent[];
    } = getEventAllValuesDefaultTimezone();

    const icalText = createCalendarWithEvents({
      eventData: inputExpectedEvents.input,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.events.length).toEqual(1);

    expectObjectArrayToBeTheSame(inputExpectedEvents, icalObject);
  });

  it("non-repeating, all values, no timezone", () => {
    const inputExpectedEvents: {
      input: IEventCreateInput[];
      expected: AggEvent[];
    } = getEventAllValuesNoTimezone();

    const icalText = createCalendarWithEvents({
      eventData: inputExpectedEvents.input,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.events.length).toEqual(1);

    expectObjectArrayToBeTheSame(inputExpectedEvents, icalObject);
  });

  it("non-repeating, required values, no timezone", () => {
    const inputExpectedEvents: {
      input: IEventCreateInput[];
      expected: AggEvent[];
    } = getEventRequiredValuesNoTimezone();

    const icalText = createCalendarWithEvents({
      eventData: inputExpectedEvents.input,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.events.length).toEqual(1);

    expectObjectArrayToBeTheSame(inputExpectedEvents, icalObject);
  });
});
