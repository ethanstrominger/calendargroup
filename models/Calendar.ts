import { CalEvent } from "./Event";

export interface ICalendar {
    calEvents: {[key:string]: CalEvent};
};

export class Calendar implements ICalendar {
    private _calEvents: {[key:string]: CalEvent} = {};
    constructor() {};
    addCalEvent = (calEvent: CalEvent) => this.calEvents[calEvent.calEventId] = calEvent;

    get calEvents (): {[key:string]: CalEvent} {
        return this._calEvents
    }

}