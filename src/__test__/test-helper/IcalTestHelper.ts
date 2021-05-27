import icalGenerator /* ical */ from "ical-generator";
// import { getVtimezoneComponent } from "@touch4it/ical-timezones";
// import { AggEvent } from "src/models/AggEvent";

export const berlinTzid = "Europe/Berlin";
export const londonTzid = "Europe/London";
export const newYorkTzid = "America/New_York";

export interface ICreateEvents {
  uid: string;
  dtStartString: string;
  dtEndString: string;
  tzId?: string;
  dtStamp: Date;
  created: Date;
  location: string;
  summary: string;
}

export function createCalendarWithEvents(data: { eventData: ICreateEvents[] }) {
  const cal = icalGenerator({});
  // Notes on iCalGenerator, getVTimezoneComponent, and timezone:
  // const cal = iCalGenerator({});  : initializes
  // cal.timezone('America/New_York', getVTimezoneComponent) sets the default timezone
  //   for the calendar and sets a full definition of that timezone in the VTIMEZONE section
  // cal.createEvent ( { ..., timezone: 'Europe/Berlin' } ) sets the timezone for the event
  // and adds the full timezone definition to the calendar

  data.eventData.forEach((event) => {
    // const offsetLocalMachin = event.dtStart.getTimezoneOffset();
    // let dt;
    // dt = new Date("2020-05-15T18:00");
    // const v1 = moment.utc(dt).tz(berlinTzid);
    // const v2 = moment.utc(v1);
    // const v3 = moment(dt);
    // console.log("debug diff", v1, v2, v3);

    const dtStart = new Date(event.dtStartString);
    const dtEnd = new Date(event.dtEndString);
    cal.createEvent({
      id: event.uid,
      start: dtStart,
      end: dtEnd,
      timezone: event.tzId,
      summary: event.summary,
      created: event.created,
      stamp: event.dtStamp,
      location: event.location,
    });
  });
  return cal.toString();
}
