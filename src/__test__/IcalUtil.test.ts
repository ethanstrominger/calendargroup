import { getIcalObjectFromText } from "../IcalUtils";
import {
  berlinTzid,
  createCalendarWithEvents as createCalendarWithEvents,
  newYorkTzid,
} from "./test-helper/IcalTestHelper";
import { IcalObject } from "../IcalObject";

function addHoursToDate(date: Date, hours: number) {
  const getTimeToHourMultiplier = 1000 * 60 * 60;
  return new Date(date.getHours() + hours);
}

describe("Events", () => {
  it(`non-repeating, all values:
    given ical text with non-repeating events and all values entered, 
    when you create an ical object,
    then each event in icalObject.events has the correct values`, () => {
    const startDateValue = new Date("2020-02-30T18:00:00");
    const endDateValue = new Date("2020-02-30T21:00:00");
    const dtStampValue = new Date("2020-02-15T15:00:03");
    const createdValue = new Date("2020-02-15T14:00:01");
    console.log("debug", startDateValue);

    const eventData = [
      {
        uid: "X1",
        dtStart: startDateValue,
        dtEnd: endDateValue,
        dtStamp: dtStampValue,
        created: createdValue,
        location: "10 Mass Ave, Boston, MA",
        summary: "Sample Event",
        tzid: newYorkTzid,
      },
      {
        uid: "X2",
        dtStart: startDateValue,
        dtEnd: endDateValue,
        dtStamp: dtStampValue,
        created: createdValue,
        location: "10 Mass Ave, Boston, MA",
        summary: "Peak's Surprise Birthday Party",
        tzid: newYorkTzid,
      },
    ];

    const icalText = createCalendarWithEvents({
      eventData: eventData,
    });

    const icalObject: IcalObject = getIcalObjectFromText(icalText);
    expect(icalObject.events.length).toEqual(2);
    eventData.forEach((eventItem, index) => {
      for (const key of Object.keys(eventItem)) {
        expect(`${key}: ${icalObject.events[index][key]}`).toEqual(
          `${key}: ${eventItem[key]}`
        );
      }
    });
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
        uid: "1",
        dtStart: startDateValue,
        dtEnd: endDateValue,
        dtStamp: dtStampValue,
        created: createdValue,
        location: "10 Mass Ave, Boston, MA",
        summary: "Sample Event",
      },
      {
        uid: "2",
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
          uid: "1",
          dtStart: startDateValue,
          dtEnd: endDateValue,
          dtStamp: dtStampValue,
          created: createdValue,
          location: "10 Mass Ave, Boston, MA",
          summary: "Sample Event",
        },
        {
          uid: "2",
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
        expect(event.tzid).toBeUndefined();
      });
    });
  });
});
