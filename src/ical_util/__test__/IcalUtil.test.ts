import {
  addTimezoneIfAbsent,
  getIcalObjectFromText,
  updateEventDescription,
} from "./IcalUtils";
import {
  createCalendarWithOneTimezone,
  createCalendarWithTwoTimezones,
  londonTimeZoneId,
} from "./ICalTestHelper";
import { IcalObject } from "./IcalObject";
import { newYorkTimeZoneId } from "./ICalTestHelper";

describe("ical util", () => {
  it("check you can get timezones from ical formatted text when one defined", () => {
    const icalText = createCalendarWithOneTimezone(newYorkTimeZoneId);
    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.timezoneIds[0]).toEqual(newYorkTimeZoneId);
  });
  it("check you can get timezones from ical formatted text when one defined", () => {
    const icalText = createCalendarWithTwoTimezones(
      newYorkTimeZoneId,
      londonTimeZoneId
    );
    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.timezoneIds.includes(newYorkTimeZoneId)).toEqual(true);
    expect(icalObject.timezoneIds.includes(londonTimeZoneId)).toEqual(true);
  });
  it("check when event has timezone then compatible timezone is the same", () => {
    const timeString = "DTSTART;TZID=Europe/Berlin:20210405T130000";
    expect(addTimezoneIfAbsent(timeString, newYorkTimeZoneId)).toEqual(
      timeString
    );
  });
  it("check when event has no timezone then compatible timezone include default timezone", () => {
    const dateString = "20200405T130000";
    const timeString = "DTSTART:" + dateString + "Z";
    const convertedTimeString = "DTSTART;TZID=America/New_York:" + dateString;
    expect(addTimezoneIfAbsent(timeString, newYorkTimeZoneId)).toEqual(
      convertedTimeString
    );
  });

  it("check when event has no timezone then compatible timezone include default timezone", () => {
    const dateString = "20220405T130000";
    const timeString = "DTSTART:" + dateString + "Z";
    const convertedTimeString = "DTSTART;TZID=America/New_York:" + dateString;
    expect(addTimezoneIfAbsent(timeString, newYorkTimeZoneId)).toEqual(
      convertedTimeString
    );
  });
});

describe("ical util - description", () => {
  it("add filename to event description", () => {
    const filename =
      "https://calendar.google.com/calendar/ical/5jflsolo07cl1rc5d07nai45o0r5aqfv%40import.calendar.google.com/public/basic.ics";
    const descriptionText =
      "Runs Mon Mar 5\n9-10 AM EST\n\nThis is the same timezone as the calendar.";
    const descriptionWithPrefix = "DESCRIPTION: " + descriptionText;
    const expectedValue = `DESCRIPTION: ${filename}\n\n${descriptionText}`;

    expect(updateEventDescription(descriptionWithPrefix, filename)).toEqual(
      expectedValue
    );
  });
});
