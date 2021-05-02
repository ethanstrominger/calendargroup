export class AggEvent {
  readonly uniqueOccurenceId: string;
  readonly uid: string;
  readonly aggEventIcalId: string;
  readonly title: string;
  readonly description?: string;
  readonly location?: string;
  readonly repeatingAggregatedEventIcalId?: string;
  readonly dtStart: Date;
  readonly dtEnd: Date;
  readonly rrule?: string;
  readonly recurrenceId?: Date;
  readonly created?: Date;
  readonly lastModified?: Date;
  readonly dtstamp?: Date;
  readonly exdate?: Date;
  readonly sequence?: number;

  constructor(aggEvent: AggEvent) {
    this.uid = aggEvent.uid;
    this.aggEventIcalId = aggEvent.aggEventIcalId;
    this.title = aggEvent.title;
    this.description = aggEvent.description;
    this.repeatingAggregatedEventIcalId =
      aggEvent.repeatingAggregatedEventIcalId;
    this.dtStart = aggEvent.dtStart;
    this.dtEnd = aggEvent.dtEnd;
    this.location = aggEvent.location;
    this.rrule = aggEvent.rrule;
    this.recurrenceId = aggEvent.recurrenceId;
    this.created = aggEvent.created;
    this.lastModified = aggEvent.lastModified;
    this.dtstamp = aggEvent.dtstamp;
    this.exdate = aggEvent.exdate;
    this.sequence = aggEvent.sequence;
    if (this.recurrenceId) {
      this.uniqueOccurenceId = this.uid + this.recurrenceId;
    } else {
      this.uniqueOccurenceId = this.uid;
    }
  }
}

export class ICalEvent {
  dtStart: Date;
  dtEnd: Date;
  eventTimezoneId?: string;
  dtStamp: Date;
  created: Date;
  location?: string;
  summary: string;
  description?: string | null;

  constructor(iCalEvent: ICalEvent) {
    this.dtStart = iCalEvent.dtStart;
    this.dtEnd = iCalEvent.dtEnd;
    this.eventTimezoneId = iCalEvent.eventTimezoneId;
    this.dtStamp = iCalEvent.dtStamp;
    this.created = iCalEvent.created;
    this.location = iCalEvent.location;
    this.summary = iCalEvent.summary;
    this.description = iCalEvent.description;
  }
}
