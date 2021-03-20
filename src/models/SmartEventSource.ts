import { AggregatedEvent } from "./AggregatedEvent";
import { v4 as uuidv4 } from "uuid";

export interface ISmartEventSource {
  aggregatedEvents: { [key: string]: AggregatedEvent };
}

export class SmartEventSource implements ISmartEventSource {
  _aggregatedEvents: { [key: string]: AggregatedEvent } = {};
  _uuid: string = "";

  constructor() {
    this._uuid = uuidv4();
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
