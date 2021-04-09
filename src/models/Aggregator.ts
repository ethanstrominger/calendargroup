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
  addEventSource(aggEventSource: AggEventSource) {
    this.aggEventSources[aggEventSource.uuid] = aggEventSource;
  }
}
