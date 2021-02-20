import { EventAggregator } from "../EventAggregator";
import { AggregatedEvent } from "../AggregatedEvent";

describe("EventAggregator CRUD", () => {
  it("A calendar can be created", () => {
    const calendar = new EventAggregator();
    expect(calendar).toBeDefined();
  });

  it("Events can be added to a calendar", () => {
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
    const calendar = new EventAggregator();
    calendar.addAggregatedEvent(aggregatedEvent1);
    calendar.addAggregatedEvent(aggregatedEvent2);
    expect(aggregatedEvent1 === calendar.aggregatedEvents["1"]).toBeTruthy();
    expect(aggregatedEvent2 === calendar.aggregatedEvents["2"]).toBeTruthy();
  });

  it("An array of events can be added to a calendar", () => {
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
    const calendar = new EventAggregator();
    calendar.addAggregatedEvents(aggregatedEventsArray);
    expect(aggregatedEvent1 === calendar.aggregatedEvents["1"]).toBeTruthy();
    expect(aggregatedEvent2 === calendar.aggregatedEvents["2"]).toBeTruthy();
  });
});
