export class AggEvent {
  originIcalUid?: string; // unique id of an original repeating event or stand alone
  // id of the original repeating event for an occurence that is changed
  recurrenceId?: string; // date string for the original date of a repeating occurence that was chagned
  summary: string;
  dtStart: Date;
  dtEnd: Date;
  rrule?: string; // repeating rule of an original repeating event definition
  description?: string;
  location?: string;
  created?: Date;
  lastModified?: Date;
  timezoneId?: string;
  dtStamp?: Date;
  exdates?: string; //

  constructor(aggEvent: AggEvent) {
    this.originIcalUid = aggEvent.originIcalUid;
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
    this.timezoneId = aggEvent.timezoneId;
  }
}

/*
//"Realized at some point I had two; we should only be using one of them."
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
*/
