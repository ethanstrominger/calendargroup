import { SmartEventSource } from "./SmartEventSource";

export class EventAggregator {
  smartEventSources: { [key: string]: SmartEventSource } = {};

  name: string;

    constructor(name: string) {
        this.name = name;
    }

    getEventSources(): any {
      return this.smartEventSources;
    }
    addEventSource(smartEventSource: SmartEventSource) {
      (this.smartEventSources[smartEventSource.uuid]= smartEventSource);
    }
};