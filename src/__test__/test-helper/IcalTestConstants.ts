import { IEventCreateInput } from "src/IEventCreateInput";

export const BERLIN_TZID = "Europe/Berlin";
export const LOS_ANGELES_TZID = "America/Los_Angeles";
export const MEXICO_CITY_TZID = "America/Mexico_City";
export const NEW_YORK_TZID = "America/New_York";

export const DEFAULT_TZID: string = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

export const NON_DEFAULT_EVENT_TZID: string =
  DEFAULT_TZID === NEW_YORK_TZID ? BERLIN_TZID : NEW_YORK_TZID;

export const NON_DEFAULT_CALENDAR_TZID: string =
  DEFAULT_TZID === LOS_ANGELES_TZID ? MEXICO_CITY_TZID : LOS_ANGELES_TZID;

export const EVENT_ALL_VALUES_DEFAULT_TZID: IEventCreateInput = {
  uid: "X1",
  dtStartString: "2020-02-15 18:00",
  dtEndString: "2020-02-15 21:00",
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  tzId: DEFAULT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
};

export const EVENT_ALL_VALUES_NON_DEFAULT_TZID: IEventCreateInput = {
  uid: "X1",
  dtStartString: "2020-02-15 18:00",
  dtEndString: "2020-02-15 21:00",
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  tzId: NON_DEFAULT_EVENT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
};

export const EVENT_ALL_VALUES_NO_TZID: IEventCreateInput = {
  uid: "X1",
  dtStartString: "2020-02-15 18:00",
  dtEndString: "2020-02-15 21:00",
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
};

export const EVENT_REQUIRED_VALUES_NO_TZID: IEventCreateInput = {
  uid: "X1",
  dtStartString: "2020-02-15 18:00",
  dtEndString: "2020-02-15 21:00",
  summary: "Sample Event",
};

export const REPEATING_EVENT_ALL_VALUES_DEFAULT_TZID: IEventCreateInput = {
  uid: "X1",
  dtStartString: "2020-02-15 18:00",
  dtEndString: "2020-02-15 21:00",
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  tzId: DEFAULT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
  rrule: "Placeholder",
};
