import { CalEvent } from "../CalEvent";

describe("store", () => {
  it("not repeating event can be created", () => {
    const currentTime = new Date();
    const calEvent = new CalEvent({
      calEventId: "hi",
      calEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    expect(calEvent).toBeDefined();
  });
});

describe("repeating events", () => {
  it("repeating event can be created", () => {
    const currentTime = new Date();
    const calEvent = new CalEvent({
      calEventId: "hi",
      calEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
      rrule: "FREQ=DAILY",
    });
    expect(calEvent).toBeDefined();
    expect(calEvent.rrule).toEqual('FREQ=DAILY');
  });
});