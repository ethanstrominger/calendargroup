import { DateTime } from "luxon";
import icalGenerator from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import { parseIcalText2 } from "src/IcalUtils";

describe("non repeating event", () => {
  it("non-repeating event can be created", () => {
    const dateString = "2022-11-11T12:13:32";
    const samoaTs = "Pacific/Pago_Pago:";
    const date = new Date(dateString);
    const tzDate = new Date(dateString);
    tzDate["tzid"] = "America/Los_Angeles";

    const icalObject = icalGenerator({});
    // icalObject.timezone with getVTimezoneComponent ensures timezone details created for
    // the event timezones.
    icalObject.timezone({ name: samoaTs, generator: getVtimezoneComponent });
    icalObject.createEvent({
      summary: "no tz",
      start: date,
      end: new Date(date.getTime() + 60000),
    });
    icalObject.createEvent({
      summary: "tzdate and cal timezone param",
      start: tzDate,
      end: new Date(tzDate.getTime() + 600000),
      timezone: "America/Los_Angeles",
    });
    icalObject.createEvent({
      summary: "timezone param",
      start: tzDate,
      end: tzDate,
      timezone: "America/Los_Angeles",
    });
    icalObject.createEvent({
      summary: "tzdate",
      start: tzDate,
      end: tzDate,
    });
  });
});
