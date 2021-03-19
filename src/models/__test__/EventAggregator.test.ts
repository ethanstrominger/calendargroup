import { EventAggregator } from "../EventAggregator";
import { SmartEventSource } from "../SmartEventSource";

describe("EventAggregator CRUD", () => {
  it("An EventAggregator can be created", () => {
    const name = "event aggregator name";
    const eventAggregator = new EventAggregator(name);
    expect(eventAggregator.name).toEqual(name);
  });
  it("Add event sources to the event aggregator		The event aggregator source list should include all of those event sources", () => {
    const name = "event aggregator name";
    const eventAggregator = new EventAggregator(name);
    const eventSource = new SmartEventSource();
    const success = eventAggregator.addEventSource();
    expect(eventAggregator.getEventSources()).toContain(eventSource);
  });
});
