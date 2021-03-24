import { SmartEventSource } from "../SmartEventSource";
import { AggregatedEvent } from "../AggregatedEvent";

describe("SmartEventSource CRUD", () => {
  it("A eventSource can be created", () => {
    const name = "Name";
    const sourceType = "URL";
    const source = "www.google.com";
    const eventSource = new SmartEventSource(name, sourceType, source);
    expect(eventSource).toBeDefined();
    expect(eventSource.name).toEqual(name);
    expect(eventSource.sourceType).toEqual(sourceType);
    expect(eventSource.source).toEqual(source);
  });

  it("Events can be added to a eventSource", () => {
    const currentTime = new Date();
    const aggregatedEvent1 = new AggregatedEvent({
      aggregatedEventId: "1",
      aggregatedEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const aggregatedEvent2 = new AggregatedEvent({
      aggregatedEventId: "2",
      aggregatedEventWebcalId: "a webcalid for event 2",
      title: "a title for event 2",
      description: "a description for event 2",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const eventSource = new SmartEventSource();
    eventSource.addAggregatedEvent(aggregatedEvent1);
    eventSource.addAggregatedEvent(aggregatedEvent2);
    expect(aggregatedEvent1 === eventSource.aggregatedEvents["1"]).toBeTruthy();
    expect(aggregatedEvent2 === eventSource.aggregatedEvents["2"]).toBeTruthy();
  });

  it("An array of events can be added to a eventSource", () => {
    const currentTime = new Date();
    const aggregatedEvent1 = new AggregatedEvent({
      aggregatedEventId: "1",
      aggregatedEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const aggregatedEvent2 = new AggregatedEvent({
      aggregatedEventId: "2",
      aggregatedEventWebcalId: "a webcalid for event 2",
      title: "a title for event 2",
      description: "a description for event 2",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const aggregatedEventsArray: AggregatedEvent[] = [
      aggregatedEvent1,
      aggregatedEvent2,
    ];
    const eventSource = new SmartEventSource();
    eventSource.addAggregatedEvents(aggregatedEventsArray);
    expect(aggregatedEvent1 === eventSource.aggregatedEvents["1"]).toBeTruthy();
    expect(aggregatedEvent2 === eventSource.aggregatedEvents["2"]).toBeTruthy();
  });
});
