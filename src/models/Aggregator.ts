import { AggEventSource } from "./AggEventSource";

export class Aggregator {
  aggEventSources: { [key: string]: AggEventSource } = {};

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getEventSources(): any {
    return this.aggEventSources;
  }
  addAggEventSource(aggEventSource: AggEventSource) {
    this.aggEventSources[aggEventSource.uuid] = aggEventSource;
  }
}
