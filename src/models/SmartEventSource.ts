import { AggregatedEvent } from "./AggregatedEvent";

export interface ISmartEventSource {
  aggregatedEvents: { [key: string]: AggregatedEvent };
}

export class SmartEventSource implements ISmartEventSource {
  _aggregatedEvents: { [key: string]: AggregatedEvent } = {};

  constructor() {}

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
