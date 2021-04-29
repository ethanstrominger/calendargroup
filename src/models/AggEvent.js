export class AggEvent {
  constructor(aggEvent) {
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
