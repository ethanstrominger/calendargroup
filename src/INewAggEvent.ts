export interface INewAggEvent {
  uid: string;
  dtStart: Date;
  dtEnd: Date;
  tzid?: string;
  dtStamp?: Date;
  created?: Date;
  location?: string;
  summary: string;
  rrule?: string;
}
