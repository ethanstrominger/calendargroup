import { INewAggEvent } from "src/INewAggEvent";
import { CalendarSource } from "src/models/CalendarSource";
import * as fs from "fs";
import {
  parseIcalTexts,
  getIcalTextFromAggEvents,
  getIcalTextFromAggEvent,
} from "src/IcalUtils";
import { assertNever } from "typedoc/dist/lib/utils";
import {
  getExpectedEvent,
  verifyEventsFromInputArray,
} from "./test-helper/IcalTestHelper";
import { AggEvent } from "src/models/AggEvent";

describe("Timezone", () => {
  it("parse events, check UTC hours is correct for time/timezone combo", () => {
    const icalText = fs.readFileSync(
      "src/__test__/test-helper/azores.ics",
      "utf8"
    );
    const calendar = parseIcalTexts(icalText);
    const newIcalText = getIcalTextFromAggEvents(
      "Pacific / Pago_Pago",
      calendar.aggEvents as INewAggEvent[]
    );
    console.log("debug genIcal", newIcalText);
    const calendar2 = parseIcalTexts(newIcalText);
    const aggEvent0 = calendar.aggEvents[0];
    const aggEvent1 = calendar.aggEvents[1];
    calendar2.aggEvents.forEach((newAggEvent) => {
      const actual: AggEvent = calendar.getEventByUid(newAggEvent.uid);
      const expected: AggEvent = getExpectedEvent(newAggEvent);
      console.log("debug compare");
      console.log(
        actual.summary,
        "\n",
        actual.dtStart,
        actual.tzid,
        "\n",
        expected.dtStart,
        expected.tzid
      );
      // DTSTART;TZID=Atlantic/Azores:20220804T110000
      // America.Los_Angeles PDT is 0 hours from UTC
      // expect(aggEvent0.dtStart.getUTCHours()).toEqual(11);
      // DTSTART;TZID=America/Los_Angeles:20220901T130000
      // America.Los_Angeles PDT is -7 hours from UTC
      // expect(aggEvent1.dtStart.getUTCHours()).toEqual(20);
      console.log("Start", aggEvent0.dtStart, aggEvent0.dtStart);
      // console.log(
      //   aggEvent0.dtStart.getUTCHours(),
      //   aggEvent0.dtStart.getHours(),
      //   aggEvent0.dtStart.getMinutes()
      // );
      console.log("Start", aggEvent1.dtStart);
      // console.log(
      //   aggEvent1.dtStart.getUTCHours(),
      //   aggEvent1.dtStart.getHours(),
      //   aggEvent1.dtStart.getMinutes()
      // );
      //     "debug diff",
      //     diff,
      //     (d2 - d) / (1000 * 60),
      //     "more",
      //     now,
      //     "d",
      //     d,
      //     new Date(d).getHours(),
      //     new Date(d).getMinutes(),
      //     "now",
      //     now,
      //     new Date(now).getHours(),
      //     new Date(now).getMinutes(),
      //     "d2",
      //     d2,
      //     new Date(d2).getHours(),f
      //     new Date(d2).getMinutes()
      //   );
    });
  });
});
