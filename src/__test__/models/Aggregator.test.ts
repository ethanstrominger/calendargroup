import { Aggregator } from "src/models/Aggregator";
import { AggEventSource } from "src/models/AggEventSource";

describe("Aggregator CRUD", () => {
  it("An Aggregator can be created", () => {
    const name = "event aggregator name";
    const aggregator = new Aggregator(name);
    expect(aggregator.name).toEqual(name);
  });
  it("Add event sources to the event aggregator		The event aggregator source list should include all of those event sources", () => {
    const name = "event aggregator name";
    const aggregator = new Aggregator(name);
    const aggEventSource = new AggEventSource(
      "agg 1",
      "URL",
      "https://example.com/events"
    );
    aggregator.addAggEventSource(aggEventSource);
    expect(aggregator.getEventSources()[aggEventSource.uuid]).toEqual(
      aggEventSource
    );
  });
});
