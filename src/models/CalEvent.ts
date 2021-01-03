export interface ICalEvent {
  calEventId: string;
  calEventWebcalId: string;
  title: string;
  description?: string;
  location?: string;
  repeatingCalEventWebcalId?: string;
  startDateTime: Date;
  endDateTime: Date;
  rules?: string[];
}

export class CalEvent implements ICalEvent {
  readonly calEventId: string;
  readonly calEventWebcalId: string;
  readonly title: string;
  readonly description?: string;
  readonly location?: string;
  readonly repeatingCalEventWebcalId?: string;
  readonly startDateTime: Date;
  readonly endDateTime: Date;
  readonly rules?: string[];

  constructor(calEvent: ICalEvent) {
    this.calEventId = calEvent.calEventId;
    this.calEventWebcalId = calEvent.calEventWebcalId;
    this.title = calEvent.title;
    this.description = calEvent.description;
    this.repeatingCalEventWebcalId = calEvent.repeatingCalEventWebcalId;
    this.startDateTime = calEvent.startDateTime;
    this.endDateTime = calEvent.endDateTime;
    this.location = calEvent.location;
    this.rules = calEvent.rules;
  }
}
