import { getIcalObjectFromText } from "../IcalUtils";
import {
  berlinTimezoneId,
  createCalendarWithEvents as createCalendarWithEvents,
  newYorkTimezoneId,
} from "./test-helper/IcalTestHelper";
import { IcalObject } from "../IcalObject";
import { ICAL_TEST_DATA as icalTestDataTwoTimezones } from "./test-helper/IcalData-events-in-newyork-and-berlin-timezones";
import { ICAL_TEST_DATA as icalTestWithNoTimezones } from "./test-helper/IcalData-Google-events-with-no-timezone";

function addHoursToDate(date: Date, hours: number) {
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  return new Date(date.getHours() + hours);
}

describe("fixed events", () => {
  it(`given ical text with an event with relevant fields having data, 
    when you create an ical object,
    then each event in icalObject.events has the correct values`, () => {
    const startDateValue = new Date("2020-01-30");
    const endDateValue = new Date("2020-01-30");
    const dtStampValue = new Date("2020-01-18");
    const createdValue = new Date("2020-01-02");

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
    ];

    const icalText = createCalendarWithEvents({
      eventData: eventData,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.events.length).toEqual(2);
    const event = icalObject.events[0];
    for (const key of Object.keys(eventData[0])) {
      expect(`${key}: ${event[key]}`).toEqual(`${key}: ${eventData[0][key]}`);
    }
  });

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
    expect(icalObject.events.length).toEqual(2);
    const event = icalObject.events[0];
    for (const key of Object.keys(eventData[0])) {
      expect(`${key}: ${eventData[0][key]}`).toEqual(`${key}: ${event[key]}`);
    }
  });

  describe("ical timezones", () => {
    it.skip(`given ical text where no events  have timezone,
    when you create an ical object,
    then the timezone is undefined for each event`, () => {
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

      expect(icalObject.events.length).toBeGreaterThan(0);
      icalObject.events.forEach((event) => {
        expect(event.timezoneId).toBeUndefined();
      });
    });
  });
});
