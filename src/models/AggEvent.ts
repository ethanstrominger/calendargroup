// TODO: ical generator ICAL.Time.fromDateTimeString(dateTimeString);
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
export class AggEvent {
  static aggEvents: { [key: string]: AggEvent } = {};
  static getByUid(uid: string) {
    return AggEvent.aggEvents[uid];
  }
  uid?: string; // unique id of an original repeating event or stand alone
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
  tzid?: string;
  dtStamp?: Date;
  exdates?: string; //

  constructor(aggEvent: AggEvent) {
    const tzid = aggEvent.tzid;
    const start = aggEvent.dtStart;
    const end = aggEvent.dtEnd;
    this.uid = aggEvent.uid ? aggEvent.uid : uuidv4();
    this.summary = aggEvent.summary;
    this.description = aggEvent.description;
    this.dtStart = new Date(
      new DateTime(start, {
        zone: tzid,
      }).getTime() +
        start.getTimezoneOffset() * 60 * 1000
    );
    this.dtEnd = new Date(
      new DateTime(aggEvent.dtEnd, {
        zone: aggEvent.tzid,
      }).getTime() +
        aggEvent.dtStart.getTimezoneOffset() * 60 * 1000
    );
    this.location = aggEvent.location;
    this.rrule = aggEvent.rrule;
    this.recurrenceId = aggEvent.recurrenceId;
    this.created = aggEvent.created;
    this.lastModified = aggEvent.lastModified;
    this.dtStamp = aggEvent.dtStamp;
    this.exdates = aggEvent.exdates;
    this.tzid = aggEvent.tzid;
    AggEvent.aggEvents[this.uid] = this;
    console.log(
      "debug aggevent",
      aggEvent.dtStart,
      this.dtStart,
      aggEvent.tzid
    );
  }
}
