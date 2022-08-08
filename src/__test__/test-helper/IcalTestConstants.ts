import { INewAggEvent } from "src/INewAggEvent";
import { ICAL_TEST_DATA } from "./IcalData-Google-events-with-no-timezone";
import { Time } from "ical.js";
import { getDateTimeWithTimeZone } from "src/IcalUtils";

export const BERLIN_TZID = "Europe/Berlin";
export const LOS_ANGELES_TZID = "America/Los_Angeles";
export const MEXICO_CITY_TZID = "America/Mexico_City";
export const NEW_YORK_TZID = "America/New_York";

export const DEFAULT_TZID: string = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

export const NON_DEFAULT_EVENT_TZID: string = BERLIN_TZID;

export const NON_DEFAULT_CALENDAR_TZID: string =
  DEFAULT_TZID === LOS_ANGELES_TZID ? MEXICO_CITY_TZID : LOS_ANGELES_TZID;

export const EVENT_ALL_VALUES_DEFAULT_TZID: INewAggEvent = {
  uid: "X1",
  dtStart: new Date("2020-02-15 18:00"),
  dtEnd: new Date("2020-02-15 21:00"),
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  tzid: DEFAULT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
};

export const EVENT_ALL_VALUES_NON_DEFAULT_TZID: INewAggEvent = {
  uid: "X2",
  dtStart: new Date(`2022-08-14 18:05:00`),
  dtEnd: new Date(`2022-08-14 18:05:00`),
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  tzid: NON_DEFAULT_EVENT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event Non Default for Timezone",
  rrule: "DTSTART:20200219T230000Z\nRRULE:FREQ=MONTHLY",
};

export const EVENT_ALL_VALUES_NO_TZID: INewAggEvent = {
  uid: "X3",
  dtStart: new Date("2020-02-17 18:00"),
  dtEnd: new Date("2020-02-17 21:00"),
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
};

export const EVENT_REQUIRED_VALUES_NO_TZID: INewAggEvent = {
  uid: "X4",
  dtStart: new Date("2020-02-18 18:00"),
  dtEnd: new Date("2020-02-18 21:00"),
  summary: "Sample Event",
};

export const REPEATING_EVENT_ALL_VALUES_DEFAULT_TZID: INewAggEvent = {
  uid: "X5",
  dtStart: new Date("2020-02-19 18:00"),
  dtEnd: new Date("2020-02-19 21:00"),
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  tzid: DEFAULT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
  rrule: "DTSTART:20200219T230000Z\nRRULE:FREQ=MONTHLY",
};
