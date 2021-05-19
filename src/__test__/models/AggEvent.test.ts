import { AggEvent as AggEvent } from "../../models/AggEvent";

describe("store", () => {
  it("not repeating event can be created", () => {
    const currentTime = new Date();
    const aggEvent = new AggEvent({
      uid: "hi",
      summary: "a summary",
      description: "a description",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    expect(aggEvent).toBeDefined();
  });
});

describe("repeating events", () => {
  it("repeating event can be created", () => {
    const currentTime = new Date();
    const aggEvent = new AggEvent({
      uid: "hi",
      summary: "a summary",
      description: "a description",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
      rrule: "FREQ=DAILY",
    });
    expect(aggEvent).toBeDefined();
    expect(aggEvent.rrule).toEqual("FREQ=DAILY");
  });
});
