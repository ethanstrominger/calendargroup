import { Aggregator } from "src/models/Aggregator";
import { CalendarSource } from "src/models/CalendarSource";

describe("Aggregator CRUD", () => {
  it("An Aggregator can be created", () => {
    const name = "event aggregator name";
    const aggregator = new Aggregator(name);
    expect(aggregator.name).toEqual(name);
  });
  it("Add event sources to the event aggregator		The event aggregator source list should include all of those event sources", () => {
    const name = "event aggregator name";
    const aggregator = new Aggregator(name);
    const calendarSource = new CalendarSource(
      "agg 1",
      "URL",
      "https://example.com/events"
    );
    aggregator.addCalendarSource(calendarSource);
    expect(aggregator.getEventSources()[calendarSource.uuid]).toEqual(
      calendarSource
    );
  });
});
