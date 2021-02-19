import { AggregatedEvent as AggregatedEvent } from "../AggregatedEvent";

describe("store", () => {
  it("not repeating event can be created", () => {
    const currentTime = new Date();
    const aggregatedEvent = new AggregatedEvent({
      aggregatedEventId: "hi",
      aggregatedEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    expect(aggregatedEvent).toBeDefined();
  });
});

describe("repeating events", () => {
  it("repeating event can be created", () => {
    const currentTime = new Date();
    const aggregatedEvent = new AggregatedEvent({
      aggregatedEventId: "hi",
      aggregatedEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
      rrule: "FREQ=DAILY",
    });
    expect(aggregatedEvent).toBeDefined();
    expect(aggregatedEvent.rrule).toEqual("FREQ=DAILY");
  });
});
