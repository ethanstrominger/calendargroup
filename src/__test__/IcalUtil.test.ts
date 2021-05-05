import { getIcalObjectFromText } from "../IcalUtils";
import {
  createCalendarWithOneTimezone,
  createCalendarWithEvent,
  londonTimezoneId,
  newYorkTimezoneId,
} from "./test-helper/IcalTestHelper";
import { IcalObject } from "../IcalObject";

function addHoursToDate(date: Date, hours: number) {
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  return new Date(date.getHours() + hours);
}

describe("ical timezones", () => {
  it.skip(`given ical text with a default timezone of NY and no events, 
  when you create an ical object,
  then the default timezone for the object is NY`, () => {
    const icalText = createCalendarWithOneTimezone(newYorkTimezoneId);
    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.defaultTimezoneId).toEqual(newYorkTimezoneId);
  });

  it(`given ical text with a default timezone of NY and no events, 
      when you create an ical object,
      then first timezoneId is NY`, () => {
    const icalText = createCalendarWithOneTimezone(newYorkTimezoneId);
    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.timezoneIds[0]).toEqual(newYorkTimezoneId);
  });

  it(`given ical text with a default timezone and an event in a different timezone, 
      when you create an ical object,
      then both timezoneIds are included in iCalObject`, () => {
    const startDateValue = new Date();
    const endDateValue = addHoursToDate(startDateValue, 1);
    const summaryValue = "A non-default timezone non-repeating event";
    const defaultTimezoneId = londonTimezoneId;
    const eventTimezoneId = newYorkTimezoneId;

    const icalText = createCalendarWithEvent({
      defaultTimezoneId: defaultTimezoneId,
      eventTimezoneId: eventTimezoneId,
      eventData: {
        originIcalUid: "1",
        dtStart: startDateValue,
        dtEnd: endDateValue,
        summary: summaryValue,
      },
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
  });
});

describe("simple events", () => {
  it.skip(`given ical text with a default timezone and an event in a different timezone, 
    when you create an ical object,
    then you can get an event array which includes the event with the original values`, () => {
    const startDateValue = new Date();
    const endDateValue = addHoursToDate(startDateValue, 1);
    const dtStampValue = addHoursToDate(startDateValue, 2);
    const createdValue = addHoursToDate(startDateValue, 3);

    const eventData = {
      originIcalUid: "1",
      dtStart: startDateValue,
      dtEnd: endDateValue,
      dtStamp: dtStampValue,
      created: createdValue,
      location: "10 Mass Ave, Boston, MA",
      summary: "Sample Event",
    };

    const icalText = createCalendarWithEvent({
      defaultTimezoneId: londonTimezoneId,
      eventTimezoneId: newYorkTimezoneId,
      eventData: eventData,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    const event = icalObject.events[0];
    for (const key of Object.keys(eventData)) {
      expect(`${key}: ${eventData[key]}`).toEqual(`${key}: ${event[key]}`);
    }
  });
});
