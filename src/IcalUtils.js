import { IcalObject } from "./IcalObject";
import { sync } from "node-ical";
import icalGenerator from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import moment from "moment";
const DEFAULT_TZID = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.toString();
export function getIcalTextFromEvents(data) {
    const cal = icalGenerator({});
    // cal.timezone with getVTimezoneComponent ensures timezone details created for
    // the event timezones.
    cal.timezone({ name: data.calendarTzid, generator: getVtimezoneComponent });
    data.eventData.forEach((event) => {
        // NOTE: ICalendar.createEvent parameters are MISLEADING.  Read below if you want to understand
        // how this works, otherwse trust the tests.  dtStart works as follows:
        //   - value for dtStart parameter is set to new Date(event.dateString) => applies the server's
        //     default format to figure out the UTC date.  This is different than the
        // .   dtString with event.tzid applied.
        //   - createEvent sets dtStart of the calendar event as follows:
        // .      - derive string value of dtStart, which happens to be the same as event.dtStartString
        //        - apply the provided tzid to that string
        //
        // Example:
        // - server default timezone is New York
        // - event.dtStartString = 18:00, event.tzId = Berlin.  UTC time is 17:00.  This is desired value.
        // - new Date(event.dtStartString) =>  UTC date is 23:00 (adjusted 5 hours for default timezone).
        // .   UTC date is incorrect
        // - createEvent magically sets the date of the iCalendar event to 18:00 Berlin tzid => 17:00 UTC even
        // .    though input was 23:00 UTC.
        cal.createEvent({
            id: event.uid,
            start: new Date(event.dtStartString),
            end: new Date(event.dtEndString),
            timezone: event.tzId ? event.tzId : DEFAULT_TZID,
            summary: event.summary,
            created: event.created,
            stamp: event.dtStamp,
            location: event.location,
        });
    });
    return cal.toString();
}
export function getIcalObjectFromText(icalText) {
    const icalData = sync.parseICS(icalText);
    const icalObject = new IcalObject();
    for (const parsedEvent of Object.values(icalData).filter((obj) => obj.type == "VEVENT")) {
        icalObject.events.push({
            uid: parsedEvent.uid.toString(),
            dtStart: parsedEvent.start,
            dtEnd: parsedEvent.end,
            dtStamp: parsedEvent.dtstamp,
            created: parsedEvent.created,
            location: parsedEvent.location,
            summary: parsedEvent.summary,
            recurrenceId: parsedEvent.recurrenceid,
            rrule: parsedEvent.rrule?.toString(),
            tzid: parsedEvent.start.tz,
        });
    }
    return icalObject;
}
export function convertToDate(dtString, tzId) {
    return moment.tz(dtString, tzId).toDate();
}
