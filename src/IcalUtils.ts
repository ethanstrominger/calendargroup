import { IcalObject } from "./IcalObject";
import { DateWithTimeZone, TimeZoneDef, sync } from "node-ical";
import moment from "moment-timezone";

export function getIcalObjectFromText(icalText: string): IcalObject {
  const icalData = sync.parseICS(icalText);
  const icalObject = new IcalObject();

  for (const parsedEvent of Object.values(icalData).filter(
    (obj) => obj.type == "VEVENT"
  )) {
    // const startDateWithTimeZone = parsedEvent.start as DateWithTimeZone;
    // const startTypeMoment = moment(startDateWithTimeZone)
    //   .tz(startDateWithTimeZone.tz)
    //   .format();
    // const startStringWithoutTz = startTypeMoment.split("+")[0].toString();
    // const originalDate = moment.tz(
    //   startStringWithoutTz,
    //   startDateWithTimeZone.tz
    // );
    // console.log(startStringWithoutTz, originalDate, startDateWithTimeZone);

    // console.log(
    //   "Debug x",
    //   startDateWithTimeZone.tz,
    //   startStringWithoutTz,
    //   originalDate.toDate(),
    //   startDateWithTimeZone
    // );
    //console.log(parsedEvent);
    icalObject.events.push({
      uid: parsedEvent.uid.toString(),
      dtStart: parsedEvent.start as Date,
      dtEnd: parsedEvent.end as Date,
      dtStamp: parsedEvent.dtstamp as Date,
      created: parsedEvent.created as Date,
      location: parsedEvent.location as string,
      summary: parsedEvent.summary as string,
      recurrenceId: parsedEvent.recurrenceid,
      rrule: parsedEvent.rrule?.toString(),
      tzid: (parsedEvent.start as DateWithTimeZone).tz,
    });
  }
  return icalObject;
}
