import { INewAggEvent } from "src/INewAggEvent";

export const NON_DEFAULT_CALENDAR_TZID = "Pacific/Marquesas";
export const NON_DEFAULT_CALENDAR_TZID_OFFSET = -9.5;
export const NON_DEFAULT_EVENT_TZID = "America/Los_Angeles";
export const NON_DEFAULT_EVENT_TZID_OFFSET = -9;

export const DEFAULT_TZID: string = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

export const EVENT_ALL_VALUES_DEFAULT_TZID: INewAggEvent = {
  uid: "X1",
  dtStartString: "2020-02-15T180000",
  dtEndString: "2020-02-15T210000",
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  timezone: DEFAULT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
};

export const EVENT_ALL_VALUES_NON_DEFAULT_TZID: INewAggEvent = {
  uid: "X2",
  dtStartString: "2020-02-16T180000",
  dtEndString: "2020-02-16T210000",
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  timezone: NON_DEFAULT_EVENT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
};

export const EVENT_ALL_VALUES_NO_TZID: INewAggEvent = {
  uid: "X3",
  dtStartString: "2020-02-17T180000",
  dtEndString: "2020-02-17T210000",
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
};

export const EVENT_REQUIRED_VALUES_NO_TZID: INewAggEvent = {
  uid: "X4",
  dtStartString: "2020-02-18T180000",
  dtEndString: "2020-02-18T210000",
  summary: "Sample Event",
};

export const REPEATING_EVENT_ALL_VALUES_DEFAULT_TZID: INewAggEvent = {
  uid: "X5",
  dtStartString: "2020-02-19T180000",
  dtEndString: "2020-02-19T210000",
  dtStamp: new Date("2020-02-15 15:00:03"),
  created: new Date("2020-02-15 14:00:01"),
  timezone: DEFAULT_TZID,
  location: "2030 Mass Ave, Lexington, MA",
  summary: "Sample Event",
  rrule: "DTSTART:20200219T230000Z\nRRULE:FREQ=MONTHLY",
};
