import { CalEvent } from "./CalEvent";

export interface ICalendar {
  calEvents: { [key: string]: CalEvent };
}

export class Calendar implements ICalendar {
  _calEvents: { [key: string]: CalEvent } = {};
  constructor() {}
  addCalEvent = (calEvent: CalEvent) =>
    (this._calEvents[calEvent.uniqueOccurenceId] = calEvent);

  get calEvents() { return this._calEvents; }
  addCalEvents = (calEvents: CalEvent[]) =>
    (calEvents.map(calEvent => {this._calEvents[calEvent.uniqueOccurenceId] = calEvent}));

}
