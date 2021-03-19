import { SmartEventSource } from "./SmartEventSource";

export class EventAggregator {
  smartEventSources: { [key: string]: SmartEventSource } = {};

    getEventSources(): any {
      return this.smartEventSources;
    }
    addEventSource(smartEventSource: SmartEventSource) {
      (this.smartEventSources[
        0
      ] = smartEventSource);
    }
    //_aggregatedEvents: { [key: string]: AggregatedEvent } = {};
    name: string;

    constructor(name: string) {
        this.name = name;
    }
};