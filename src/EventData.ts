import { AggEvent } from "./models/AggEvent";

interface AggEventKeyType {
  [key: string]: AggEvent;
}
export class EventData {
  constructor() {}

  addEvents(aggEvents: AggEvent[]) {
    this._events.push(...aggEvents);
  }

  private _events: AggEvent[] = [];

  get events(): AggEvent[] {
    return this._events;
  }

  set events(events: AggEvent[]) {
    this._events = events;
    events.forEach((event) => {
      this._eventsWithKeys[event.uid] = event;
    });
  }

  // events: AggEvent[] = [];

  private _eventsWithKeys: AggEventKeyType = {};
  get eventsWithKeys(): AggEventKeyType {
    return this._eventsWithKeys;
  }
}
