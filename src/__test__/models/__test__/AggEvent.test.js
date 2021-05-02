import { AggEvent as AggEvent } from "../AggEvent";
describe("store", () => {
  it("not repeating event can be created", () => {
    const currentTime = new Date();
    const aggEvent = new AggEvent({
      uid: "hi",
      aggEventIcalId: "a icalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    expect(aggEvent).toBeDefined();
  });
});
describe("repeating events", () => {
  it("repeating event can be created", () => {
    const currentTime = new Date();
    const aggEvent = new AggEvent({
      uid: "hi",
      aggEventIcalId: "a icalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
      rrule: "FREQ=DAILY",
    });
    expect(aggEvent).toBeDefined();
    expect(aggEvent.rrule).toEqual("FREQ=DAILY");
  });
});
