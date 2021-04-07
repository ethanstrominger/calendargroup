import { AggregatedEvent } from "./AggregatedEvent";
import { v4 as uuidv4 } from "uuid";

export interface ISmartEventSource {
  aggregatedEvents: { [key: string]: AggregatedEvent };
}

export class SmartEventSource implements ISmartEventSource {

  // C Field - 
  readonly aggregatedEvents: { [key: string]: AggregatedEvent } = {};
  readonly uuid: string = "";
  name: string;
  sourceType: string;
  source: string;

  static smartEventSources: { [key: string]: SmartEventSource } = {};
  static getByUUID(uuid: string) {
    return SmartEventSource.smartEventSources[uuid];
  }

  constructor(name, sourceType, source) {
    this.uuid = uuidv4();
    this.name = name;
    this.sourceType = sourceType;
    this.source = source;
    SmartEventSource.smartEventSources[this.uuid] = this;
  }

  addAggregatedEvent = (aggregatedEvent: AggregatedEvent) =>
    (this.aggregatedEvents[
      aggregatedEvent.uniqueOccurenceId
    ] = aggregatedEvent);

  addAggregatedEvents = (aggregatedEvents: AggregatedEvent[]) =>
    aggregatedEvents.map((aggregatedEvent) => {
      this.addAggregatedEvent(aggregatedEvent);
    });
}
