import { getIcalObjectFromText } from "../IcalUtils";
import { createCalendarWithEvents as createCalendarWithEvents } from "./test-helper/IcalTestHelper";
import { IcalObject } from "../IcalObject";
import { ICAL_TEST_DATA as icalTestDataTwoTimezones } from "./test-helper/IcalData-events-in-newyork-and-berlin-timezones";
import { ICAL_TEST_DATA as icalTestWithNoTimezones } from "./test-helper/IcalData-Google-events-with-no-timezone";

function addHoursToDate(date: Date, hours: number) {
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  return new Date(date.getHours() + hours);
}

describe("ical timezones", () => {
  it(`given ical text where two events use timezone of NY and 
  two events use Europe/Berlin
  when you create an ical object,
  then the timezones are associated with the timezone`, () => {
    const icalText = icalTestDataTwoTimezones.calData;
    const expectedResults = icalTestDataTwoTimezones;
    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.events[0].timezoneId).toEqual(
      expectedResults[0].timezoneId
    );
    expect(icalObject.events[1].timezoneId).toEqual(
      expectedResults[1].timezoneId
    );
    expect(icalObject.events[2].timezoneId).toEqual(
      expectedResults[2].timezoneId
    );
    expect(icalObject.events[3].timezoneId).toEqual(
      expectedResults[3].timezoneId
    );
  });
});

describe("ical timezones", () => {
  it.skip(`given ical text where no events  have timezone,
  when you create an ical object,
  then the timezone is undefined for each event`, () => {
    const icalText = icalTestWithNoTimezones.calData;
    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.events.length).toBeGreaterThan(0);
    icalObject.events.forEach((event) => {
      expect(event.timezoneId).toBeUndefined();
    });
  });
});

describe("simple events", () => {
  it.skip(`given ical text with an event with relevant fields having data, 
    when you create an ical object,
    then each event in icalObject.events has the correct values`, () => {
    const startDateValue = new Date();
    const endDateValue = addHoursToDate(startDateValue, 1);
    const dtStampValue = addHoursToDate(startDateValue, 2);
    const createdValue = addHoursToDate(startDateValue, 3);

    const eventData = [
      {
        originIcalUid: "1",
        dtStart: startDateValue,
        dtEnd: endDateValue,
        dtStamp: dtStampValue,
        created: createdValue,
        location: "10 Mass Ave, Boston, MA",
        summary: "Sample Event",
      },
      {
        originIcalUid: "2",
        dtStart: addHoursToDate(startDateValue, 24),
        dtEnd: addHoursToDate(endDateValue, 24),
        dtStamp: addHoursToDate(dtStampValue, 24),
        created: addHoursToDate(createdValue, 24),
        location: "2030 Mass Ave, Lexington, MA",
        summary: "Another Sample Event",
      },
    ];

    const icalText = createCalendarWithEvents({
      eventData: eventData,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    const event = icalObject.events[0];
    for (const key of Object.keys(eventData)) {
      expect(`${key}: ${eventData[key]}`).toEqual(`${key}: ${event[key]}`);
    }
  });
});
