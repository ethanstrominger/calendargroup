import { SmartEventSource } from "../SmartEventSource";
import { AggEvent } from "../AggEvent";

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

  it("You can get an eventSource by UUID", () => {
    const name = "Name";
    const sourceType = "URL";
    const source = "www.google.com";
    const eventSource = new SmartEventSource(name, sourceType, source);
    const retrievedEventSource = SmartEventSource.getByUUID(eventSource.uuid);
    expect(retrievedEventSource.name).toEqual(name);
    expect(retrievedEventSource.sourceType).toEqual(sourceType);
    expect(retrievedEventSource.source).toEqual(source);
  });

  it("Events can be added to a eventSource", () => {
    const currentTime = new Date();
    const aggEvent1 = new AggEvent({
      aggEventId: "1",
      aggEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const aggEvent2 = new AggEvent({
      aggEventId: "2",
      aggEventWebcalId: "a webcalid for event 2",
      title: "a title for event 2",
      description: "a description for event 2",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const eventSource = new SmartEventSource();
    eventSource.addAggEvent(aggEvent1);
    eventSource.addAggEvent(aggEvent2);
    expect(aggEvent1 === eventSource.aggEvents["1"]).toBeTruthy();
    expect(aggEvent2 === eventSource.aggEvents["2"]).toBeTruthy();
  });

  it("An array of events can be added to a eventSource", () => {
    const currentTime = new Date();
    const aggEvent1 = new AggEvent({
      aggEventId: "1",
      aggEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const aggEvent2 = new AggEvent({
      aggEventId: "2",
      aggEventWebcalId: "a webcalid for event 2",
      title: "a title for event 2",
      description: "a description for event 2",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const aggEventsArray: AggEvent[] = [aggEvent1, aggEvent2];
    const eventSource = new SmartEventSource();
    eventSource.addAggEvents(aggEventsArray);
    expect(aggEvent1 === eventSource.aggEvents["1"]).toBeTruthy();
    expect(aggEvent2 === eventSource.aggEvents["2"]).toBeTruthy();
  });
});
