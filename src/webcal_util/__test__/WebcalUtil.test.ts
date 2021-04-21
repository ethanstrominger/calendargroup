import { addTimezoneIfAbsent, updateEventDescription } from "./WebcalUtils";

describe("webcal util", () => {
    it("check when event has timezone then compatible timezone is the same", () => {
        const timeString = "DTSTART;TZID=Europe/Berlin:20210405T130000";
        expect(addTimezoneIfAbsent(timeString, "America/New_York")).toEqual(timeString);
    });
    it("check when event has no timezone then compatible timezone include default timezone", () => {
        const dateString = "20200405T130000"
        const timeString = "DTSTART:" + dateString + "Z";
        const convertedTimeString =  "DTSTART;TZID=America/New_York:" + dateString;
        expect(addTimezoneIfAbsent(timeString, "America/New_York")).toEqual(convertedTimeString);
    });

    it("check when event has no timezone then compatible timezone include default timezone", () => {
        const dateString = "20220405T130000"
        const timeString = "DTSTART:" + dateString + "Z";
        const convertedTimeString =  "DTSTART;TZID=America/New_York:" + dateString;
        expect(addTimezoneIfAbsent(timeString, "America/New_York")).toEqual(convertedTimeString);
    });

});

describe("webcal util - description", () => {

    it("add filename to event description", () => {
      const filename = "https://calendar.google.com/calendar/ical/5jflsolo07cl1rc5d07nai45o0r5aqfv%40import.calendar.google.com/public/basic.ics";
      const descriptionText = "Runs Mon Mar 5\n9-10 AM EST\n\nThis is the same timezone as the calendar."
      const descriptionWithPrefix = "DESCRIPTION: " + descriptionText;
      const expectedValue = `DESCRIPTION: ${filename}\n\n${descriptionText}`;

      expect(updateEventDescription(descriptionWithPrefix, filename)).toEqual(expectedValue);
    })
});
