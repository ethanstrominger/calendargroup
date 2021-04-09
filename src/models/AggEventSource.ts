import { AggEvent } from "./AggEvent";
import { v4 as uuidv4 } from "uuid";

export interface IAggEventSource {
  aggEvents: { [key: string]: AggEvent };
}

export class AggEventSource implements IAggEventSource {
  // C Field -
  readonly aggEvents: { [key: string]: AggEvent } = {};
  readonly uuid: string = "";
  name: string;
  sourceType: string;
  source: string;

  static aggEventSources: { [key: string]: AggEventSource } = {};
  static getByUUID(uuid: string) {
    return AggEventSource.aggEventSources[uuid];
  }

  constructor(name, sourceType, source) {
    this.uuid = uuidv4();
    this.name = name;
    this.sourceType = sourceType;
    this.source = source;
    AggEventSource.aggEventSources[this.uuid] = this;
  }

  addAggEvent = (aggEvent: AggEvent) =>
    (this.aggEvents[aggEvent.uniqueOccurenceId] = aggEvent);

  addAggEvents = (aggEvents: AggEvent[]) =>
    aggEvents.map((aggEvent) => {
      this.addAggEvent(aggEvent);
    });
}
