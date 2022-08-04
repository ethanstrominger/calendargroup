import { CalendarSource } from "src/models/CalendarSource";
import { AggEvent } from "src/models/AggEvent";

describe("CalendarSource CRUD", () => {
  it("A calendarSource can be created", () => {
    const name = "Name";
    const sourceType = "URL";
    const source = "www.google.com";
    const calendarSource = new CalendarSource(name, sourceType, source);
    expect(calendarSource).toBeDefined();
    expect(calendarSource.name).toEqual(name);
    expect(calendarSource.sourceType).toEqual(sourceType);
    expect(calendarSource.source).toEqual(source);
  });

  it("You can get an calendarSource by originIcaluid", () => {
    const name = "Name";
    const sourceType = "URL";
    const source = "www.google.com";
    const calendarSource = new CalendarSource(name, sourceType, source);
    const retrievedEventSource = CalendarSource.getByUuid(calendarSource.uuid);
    expect(retrievedEventSource.name).toEqual(name);
    expect(retrievedEventSource.sourceType).toEqual(sourceType);
    expect(retrievedEventSource.source).toEqual(source);
  });

  it("Events can be added to a calendarSource", () => {
    const currentTime = new Date();
    const aggEvent1 = new AggEvent({
      uid: "1",
      summary: "a summary",
      description: "a description",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const aggEvent2 = new AggEvent({
      uid: "2",
      summary: "a summary for event 2",
      description: "a description for event 2",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const calendarSource = new CalendarSource(
      "name",
      "URL",
      "https://example.com/events"
    );
    calendarSource.addAggEvent(aggEvent1);
    calendarSource.addAggEvent(aggEvent2);
    expect(aggEvent1 === calendarSource.aggEvents[0]).toBeTruthy();
    expect(aggEvent2 === calendarSource.aggEvents[1]).toBeTruthy();
  });

  it("An array of events can be added to a calendarSource", () => {
    const currentTime = new Date();
    const aggEvent1 = new AggEvent({
      uid: "1",
      summary: "a summary",
      description: "a description",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const aggEvent2 = new AggEvent({
      uid: "2",
      summary: "a summary for event 2",
      description: "a description for event 2",
      dtStart: currentTime,
      dtEnd: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const aggEventsArray: AggEvent[] = [aggEvent1, aggEvent2];
    const calendarSource = new CalendarSource(
      "name",
      "URL",
      "https://example.com/events"
    );
    calendarSource.addAggEvents(aggEventsArray);
    expect(aggEvent1 === calendarSource.aggEvents[0]).toBeTruthy();
    expect(aggEvent2 === calendarSource.aggEvents[1]).toBeTruthy();
  });
});
