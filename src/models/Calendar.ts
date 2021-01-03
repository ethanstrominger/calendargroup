import { CalEvent, ICalEvent } from "./CalEvent";
import ICAL from "ical.js";

export interface ICalendar {
  calEvents: { [key: string]: CalEvent };
}

export class Calendar implements ICalendar {
  _calEvents: { [key: string]: CalEvent } = {};
  constructor() {}
  addCalEvent = (calEvent: CalEvent) =>
    (this._calEvents[calEvent.calEventId] = calEvent);

  get calEvents() { return this._calEvents; }
  addCalEvents = (calEvents: CalEvent[]) =>
    (calEvents.map(calEvent => {this._calEvents[calEvent.calEventId] = calEvent}));

}
