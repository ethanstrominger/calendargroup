import { v4 as uuidv4 } from "uuid";
export class AggEvent {
  static aggEvents: { [key: string]: AggEvent } = {};
  static getByUid(uid: string) {
    console.log("aggEvents", uid, AggEvent.aggEvents);
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
    this.uid = aggEvent.uid ? aggEvent.uid : uuidv4();
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
    AggEvent.aggEvents[this.uid] = this;
  }
}
