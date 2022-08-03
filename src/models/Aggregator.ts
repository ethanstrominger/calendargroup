import { CalendarSource } from "./CalendarSource";

export class Aggregator {
  calendarSources: { [key: string]: CalendarSource } = {};

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getEventSources(): any {
    return this.calendarSources;
  }
  addCalendarSource(calendarSource: CalendarSource) {
    this.calendarSources[calendarSource.uuid] = calendarSource;
  }
}
