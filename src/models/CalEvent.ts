export interface ICalEvent {
  calEventId: string;
  calEventWebcalId: string;
  title: string;
  description?: string;
  location?: string;
  repeatingCalEventWebcalId?: string;
  startDateTime: Date;
  endDateTime: Date;
  rrule?: string;
  recurenceId?: Date;
  created?: Date;
  lastModified?: Date;
  dtstamp?: Date;
  exdate?: Date;
  sequence?: number;
}

export class CalEvent implements ICalEvent {
  readonly uniqueOccurenceId: string;
  readonly calEventId: string;
  readonly calEventWebcalId: string;
  readonly title: string;
  readonly description?: string;
  readonly location?: string;
  readonly repeatingCalEventWebcalId?: string;
  readonly startDateTime: Date;
  readonly endDateTime: Date;
  readonly rrule?: string;
  readonly recurenceId?: Date;
  readonly created?: Date;
  readonly lastModified?: Date;
  readonly dtstamp?: Date;
  readonly exdate?: Date;
  readonly sequence?: number;

  constructor(calEvent: ICalEvent) {
    this.calEventId = calEvent.calEventId;
    this.calEventWebcalId = calEvent.calEventWebcalId;
    this.title = calEvent.title;
    this.description = calEvent.description;
    this.repeatingCalEventWebcalId = calEvent.repeatingCalEventWebcalId;
    this.startDateTime = calEvent.startDateTime;
    this.endDateTime = calEvent.endDateTime;
    this.location = calEvent.location;
    this.rrule = calEvent.rrule;
    this.recurenceId = calEvent.recurenceId;
    this.created = calEvent.created;
    this.lastModified = calEvent.lastModified;
    this.dtstamp = calEvent.dtstamp;
    this.exdate = calEvent.exdate;
    this.sequence = calEvent.sequence;
    if (this.recurenceId) {
      this.uniqueOccurenceId = this.calEventId + this.recurenceId
    } else {
      this.uniqueOccurenceId = this.calEventId;
    }
  }
}
