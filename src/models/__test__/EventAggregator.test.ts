import { EventAggregator } from "../EventAggregator";

describe("EventAggregator CRUD", () => {
    it("An EventAggregator can be created", () => {
      const name = "event aggregator name"
      const eventAggregator = new EventAggregator(name);
      expect(eventAggregator.name).toEqual(name);

    });
});