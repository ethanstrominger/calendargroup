import { AggEvent } from "src/models/AggEvent";

describe("non repeating event", () => {
  it("non-repeating event can be created", () => {
    const currentTime = new Date();
    const values = {
      summary: "summary",
      descrption: "a description",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    };
    const aggEvent = new AggEvent({
      summary: values.summary,
      description: values.descrption,
      dtStart: values.dtStart,
      dtEnd: values.dtEnd,
    });
    const aggEventByUid = AggEvent.getByUid(aggEvent.uid);
    expect(aggEventByUid.summary).toEqual(values.summary);
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
