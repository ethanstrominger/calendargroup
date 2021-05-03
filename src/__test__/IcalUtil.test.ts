import { getIcalObjectFromText } from "../IcalUtils";
import {
  createCalendarWithOneTimezone,
  createCalendarWithTwoTimezones,
  createCalendarWithEvent,
  londonTimeZoneId,
  newYorkTimeZoneId,
} from "./test-helper/IcalTestHelper";
import { IcalObject } from "../IcalObject";

describe("ical timezones", () => {
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
});

function addHoursToDate(date: Date, hours: number) {
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  return new Date(date.getTime() + 2 * getTimeToHourMultiplier);
}

describe("simple events", () => {
  it("check event values get saved", () => {
    const startDateValue = new Date();
    const endDateValue = addHoursToDate(startDateValue, 1);
    const dtStampValue = addHoursToDate(startDateValue, 2);
    const createdValue = addHoursToDate(startDateValue, 3);
    const locationValue = "10 Mass Ave, Boston, MA";
    const summaryValue = "A non-default timezone non-repeating event";

    const icalText = createCalendarWithEvent(
      {calendarTimeZoneId : londonTimeZoneId,
      eventTimeZoneId : newYorkTimeZoneId,
      eventData : {
        originIcalUid: "1",
        dtStart: startDateValue,
        dtEnd: endDateValue,
        dtStamp: dtStampValue,
        created: createdValue,
        location: locationValue,
        summary: summaryValue,
      }}
    );

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    const event = icalObject.events[0];
    expect(icalObject.events[0].summary).toEqual(summaryValue);
  });
});
