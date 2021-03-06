export interface INewEvent {
  uid: string;
  dtStartString: string;
  dtEndString: string;
  tzId?: string;
  dtStamp?: Date;
  created?: Date;
  location?: string;
  summary: string;
  rrule?: string;
}
