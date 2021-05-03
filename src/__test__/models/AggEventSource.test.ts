import { AggEventSource } from "../../models/AggEventSource";
import { AggEvent } from "../../models/AggEvent";

describe("AggEventSource CRUD", () => {
  it("A aggEventSource can be created", () => {
    const name = "Name";
    const sourceType = "URL";
    const source = "www.google.com";
    const aggEventSource = new AggEventSource(name, sourceType, source);
    expect(aggEventSource).toBeDefined();
    expect(aggEventSource.name).toEqual(name);
    expect(aggEventSource.sourceType).toEqual(sourceType);
    expect(aggEventSource.source).toEqual(source);
  });

  it("You can get an aggEventSource by UoriginIcalUid", () => {
    const name = "Name";
    const sourceType = "URL";
    const source = "www.google.com";
    const aggEventSource = new AggEventSource(name, sourceType, source);
    const retrievedEventSource = AggEventSource.getByUUID(aggEventSource.uuid);
    expect(retrievedEventSource.name).toEqual(name);
    expect(retrievedEventSource.sourceType).toEqual(sourceType);
    expect(retrievedEventSource.source).toEqual(source);
  });

  it("Events can be added to a aggEventSource", () => {
    const currentTime = new Date();
    const aggEvent1 = new AggEvent({
      originIcalUid: "1",
      summary: "a summary",
      description: "a description",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const aggEvent2 = new AggEvent({
      originIcalUid: "2",
      summary: "a summary for event 2",
      description: "a description for event 2",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const aggEventSource = new AggEventSource(
      "name",
      "URL",
      "https://example.com/events"
    );
    aggEventSource.addAggEvent(aggEvent1);
    aggEventSource.addAggEvent(aggEvent2);
    expect(aggEvent1 === aggEventSource.aggEvents[0]).toBeTruthy();
    expect(aggEvent2 === aggEventSource.aggEvents[1]).toBeTruthy();
  });

  it("An array of events can be added to a aggEventSource", () => {
    const currentTime = new Date();
    const aggEvent1 = new AggEvent({
      originIcalUid: "1",
      summary: "a summary",
      description: "a description",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const aggEvent2 = new AggEvent({
      originIcalUid: "2",
      summary: "a summary for event 2",
      description: "a description for event 2",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const aggEventsArray: AggEvent[] = [aggEvent1, aggEvent2];
    const aggEventSource = new AggEventSource(
      "name",
      "URL",
      "https://example.com/events"
    );
    aggEventSource.addAggEvents(aggEventsArray);
    expect(aggEvent1 === aggEventSource.aggEvents[0]).toBeTruthy();
    expect(aggEvent2 === aggEventSource.aggEvents[1]).toBeTruthy();
  });
});
