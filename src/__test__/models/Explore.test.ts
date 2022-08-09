import { DateTime } from "luxon";
import icalGenerator from "ical-generator";
import { getVtimezoneComponent } from "@touch4it/ical-timezones";
import { parseIcalText2 } from "src/IcalUtils";

describe("non repeating event", () => {
  it("non-repeating event can be created", () => {
    const dateString = "2022-08-04T12:13:32";
    const tzid = "America/Los_Angeles";
    const luxonDate = DateTime.fromISO(dateString, { zone: tzid });
    console.log("luxonDate", luxonDate);
    const luxonDateDate = luxonDate.toJSDate();
    console.log("luxonDateDate", luxonDateDate);
    const luxonDateDateDate = new Date(luxonDateDate.getTime());
    console.log("luxonDateDateDate", luxonDateDateDate);
    const luxonDateJson = luxonDate.toJSDate();
    console.log("luxonDateJson", luxonDateJson);
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
      end: date,
    });
    icalObject.createEvent({
      summary: "all tz",
      start: tzDate,
      end: new Date(tzDate.getTime() + 600000),
      timezone: "America/Los_Angeles",
    });
    icalObject.createEvent({
      summary: "tz param",
      start: tzDate,
      end: tzDate,
      timezone: "America/Los_Angeles",
    });
    icalObject.createEvent({
      summary: "tz date",
      start: tzDate,
      end: tzDate,
    });
    const icalText = icalObject.toString();
    const icalArray = icalText.split("\r\n");

    console.log(
      "icalArray",
      icalArray.filter(
        (line) => line.startsWith("DTSTART") || line.startsWith("SUMMARY")
      )
    );

    const calendar = parseIcalText2(icalText);
    calendar.aggEvents.forEach((aggEvent) => {
      console.log("aggEvent", aggEvent.summary, aggEvent.aggEvent.dtStart);
    });
  });
});
