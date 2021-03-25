import { AggregatedEvent } from "./AggregatedEvent";
import { v4 as uuidv4 } from "uuid";

export interface ISmartEventSource {
  aggregatedEvents: { [key: string]: AggregatedEvent };
}

export class SmartEventSource implements ISmartEventSource {
  _aggregatedEvents: { [key: string]: AggregatedEvent } = {};
  _uuid: string = "";
  name: string;
  sourceType: string;
  source: string;

  constructor(name, sourceType, source) {
    this._uuid = uuidv4();
    this.name = name;
    this.sourceType = sourceType;
    this.source = source;
  }


  get uuid(): string {return this._uuid}

  addAggregatedEvent = (aggregatedEvent: AggregatedEvent) =>
    (this._aggregatedEvents[
      aggregatedEvent.uniqueOccurenceId
    ] = aggregatedEvent);

  get aggregatedEvents() {
    return this._aggregatedEvents;
  }

  addAggregatedEvents = (aggregatedEvents: AggregatedEvent[]) =>
    aggregatedEvents.map((aggregatedEvent) => {
      this.addAggregatedEvent(aggregatedEvent);
    });
}
