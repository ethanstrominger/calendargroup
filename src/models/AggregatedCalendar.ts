import { CalEvent } from "./CalEvent";

export interface IAggregatedCalendar {
  calEvents: { [key: string]: CalEvent };
}

export class AggregatedCalendar implements IAggregatedCalendar {
  _calEvents: { [key: string]: CalEvent } = {};
  
  constructor() {}
  
  addCalEvent = (calEvent: CalEvent) =>
    (this._calEvents[calEvent.uniqueOccurenceId] = calEvent);

  get calEvents() { return this._calEvents; }

  addCalEvents = (calEvents: CalEvent[]) =>
    (calEvents.map(calEvent => {this.addCalEvent(calEvent)}));

}
