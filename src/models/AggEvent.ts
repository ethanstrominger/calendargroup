export class AggEvent {
  readonly uniqueOccurenceId: string;
  readonly uid: string;
  readonly aggEventWebcalId: string;
  readonly title: string;
  readonly description?: string;
  readonly location?: string;
  readonly repeatingAggregatedEventWebcalId?: string;
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
    this.aggEventWebcalId = aggEvent.aggEventWebcalId;
    this.title = aggEvent.title;
    this.description = aggEvent.description;
    this.repeatingAggregatedEventWebcalId =
      aggEvent.repeatingAggregatedEventWebcalId;
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