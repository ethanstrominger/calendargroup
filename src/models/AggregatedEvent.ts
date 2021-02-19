export interface IAggregatedEvent {
  aggregatedEventId: string;
  aggregatedEventWebcalId: string;
  title: string;
  description?: string;
  location?: string;
  repeatingAggregatedEventWebcalId?: string;
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

export class AggregatedEvent implements IAggregatedEvent {
  readonly uniqueOccurenceId: string;
  readonly aggregatedEventId: string;
  readonly aggregatedEventWebcalId: string;
  readonly title: string;
  readonly description?: string;
  readonly location?: string;
  readonly repeatingAggregatedEventWebcalId?: string;
  readonly startDateTime: Date;
  readonly endDateTime: Date;
  readonly rrule?: string;
  readonly recurenceId?: Date;
  readonly created?: Date;
  readonly lastModified?: Date;
  readonly dtstamp?: Date;
  readonly exdate?: Date;
  readonly sequence?: number;

  constructor(aggregatedEvent: IAggregatedEvent) {
    this.aggregatedEventId = aggregatedEvent.aggregatedEventId;
    this.aggregatedEventWebcalId = aggregatedEvent.aggregatedEventWebcalId;
    this.title = aggregatedEvent.title;
    this.description = aggregatedEvent.description;
    this.repeatingAggregatedEventWebcalId =
      aggregatedEvent.repeatingAggregatedEventWebcalId;
    this.startDateTime = aggregatedEvent.startDateTime;
    this.endDateTime = aggregatedEvent.endDateTime;
    this.location = aggregatedEvent.location;
    this.rrule = aggregatedEvent.rrule;
    this.recurenceId = aggregatedEvent.recurenceId;
    this.created = aggregatedEvent.created;
    this.lastModified = aggregatedEvent.lastModified;
    this.dtstamp = aggregatedEvent.dtstamp;
    this.exdate = aggregatedEvent.exdate;
    this.sequence = aggregatedEvent.sequence;
    if (this.recurenceId) {
      this.uniqueOccurenceId = this.aggregatedEventId + this.recurenceId;
    } else {
      this.uniqueOccurenceId = this.aggregatedEventId;
    }
  }
}
