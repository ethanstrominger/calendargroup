export class AggEvent {
    constructor(aggEvent) {
        this.uid = aggEvent.uid;
        this.summary = aggEvent.summary;
        this.description = aggEvent.description;
        this.dtStart = aggEvent.dtStart;
        this.dtEnd = aggEvent.dtEnd;
        this.location = aggEvent.location;
        this.rrule = aggEvent.rrule;
        this.recurrenceId = aggEvent.recurrenceId;
        this.created = aggEvent.created;
        this.lastModified = aggEvent.lastModified;
        this.dtStamp = aggEvent.dtStamp;
        this.exdates = aggEvent.exdates;
        this.tzid = aggEvent.tzid;
    }
}
