import moment from "moment";
import { IcalObject } from "src/IcalObject";
import { IEventCreateInput } from "src/IEventCreateInput";
import { AggEvent } from "src/models/AggEvent";
// import { getVtimezoneComponent } from "@touch4it/ical-timezones";
// import { AggEvent } from "src/models/AggEvent";

export const berlinTzid = "Europe/Berlin";
export const londonTzid = "Europe/London";
export const newYorkTzid = "America/New_York";

export function expectObjectArrayToBeTheSame(
  inputExpectedEvents: { input: IEventCreateInput[]; expected: AggEvent[] },
  icalObject: IcalObject
) {
  inputExpectedEvents.expected.forEach((expectedEvent, index) => {
    expectObjectToBeSame(expectedEvent, icalObject, index);
  });
}

export function expectObjectToBeSame(
  expectedEvent: AggEvent,
  icalObject: IcalObject,
  index: number
) {
  for (const key of Object.keys(expectedEvent)) {
    expect(`${key}: ${icalObject.events[index][key]}`).toEqual(
      `${key}: ${expectedEvent[key]}`
    );
  }
}

export function getEventAllValuesDefaultTimezone(): {
  input: IEventCreateInput[];
  expected: AggEvent[];
} {
  const input = [
    {
      uid: "X1",
      dtStartString: "2020-02-15 18:00",
      dtEndString: "2020-02-15 21:00",
      dtStamp: new Date("2020-02-15 15:00:03"),
      created: new Date("2020-02-15 14:00:01"),
      tzId: DEFAULT_TZID,
      location: "2030 Mass Ave, Lexington, MA",
      summary: "Sample Event",
    },
  ];
  const expected: AggEvent[] = input.map((inputEvent) => {
    return getExpected(inputEvent);
  });

  return {
    expected: expected,
    input: input,
  };
}

const DEFAULT_TZID = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.toString();

export function getEventAllValuesNonDefaultTimezone(): {
  input: IEventCreateInput[];
  expected: AggEvent[];
} {
  const nonDefaultTzid =
    DEFAULT_TZID === newYorkTzid ? berlinTzid : newYorkTzid;
  const input = [
    {
      uid: "X1",
      dtStartString: "2020-02-15 18:00",
      dtEndString: "2020-02-15 21:00",
      dtStamp: new Date("2020-02-15 15:00:03"),
      created: new Date("2020-02-15 14:00:01"),
      tzId: nonDefaultTzid,
      location: "2030 Mass Ave, Lexington, MA",
      summary: "Sample Event",
    },
  ];
  const expected: AggEvent[] = input.map((inputEvent) => {
    return getExpected(inputEvent);
  });

  return {
    expected: expected,
    input: input,
  };
}

export function getEventAllValuesNoTimezone(): {
  input: IEventCreateInput[];
  expected: AggEvent[];
} {
  const nonDefaultTTzid =
    DEFAULT_TZID === newYorkTzid ? berlinTzid : newYorkTzid;
  const input = [
    {
      uid: "X1",
      dtStartString: "2020-02-15 18:00",
      dtEndString: "2020-02-15 21:00",
      dtStamp: new Date("2020-02-15 15:00:03"),
      created: new Date("2020-02-15 14:00:01"),
      location: "2030 Mass Ave, Lexington, MA",
      summary: "Sample Event",
    },
  ];
  const expected: AggEvent[] = input.map((inputEvent) => {
    return getExpected(inputEvent);
  });

  return {
    expected: expected,
    input: input,
  };
}
export function getEventRequiredValuesNoTimezone(): {
  input: IEventCreateInput[];
  expected: AggEvent[];
} {
  const nonDefaultTTzid =
    DEFAULT_TZID === newYorkTzid ? berlinTzid : newYorkTzid;
  const input = [
    {
      uid: "X1",
      dtStartString: "2020-02-15 18:00",
      dtEndString: "2020-02-15 21:00",
      summary: "Sample Event",
    },
  ];
  const expected: AggEvent[] = input.map((inputEvent) => {
    return getExpected(inputEvent);
  });

  return {
    expected: expected,
    input: input,
  };
}

function getExpected(inputEvent: IEventCreateInput): AggEvent {
  const tzId = inputEvent.tzId ? inputEvent.tzId : DEFAULT_TZID;
  const expected = {
    uid: inputEvent.uid,
    dtStart: moment.tz(inputEvent.dtStartString, tzId).toDate(),
    dtEnd: moment.tz(inputEvent.dtEndString, tzId).toDate(),
    tzid: tzId,
    created: inputEvent.created,
    summary: inputEvent.summary,
    location: inputEvent.location,
  };

  if (!inputEvent.dtStamp) {
    delete inputEvent.dtStamp;
  }

  if (!inputEvent.created) {
    delete inputEvent.created;
  }

  if (!inputEvent.location) {
    delete inputEvent.location;
  }

  return expected;
}
