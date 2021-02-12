import { CalEvent } from "../models/CalEvent";
import { readFileSync } from "fs";
import ICAL from "ical.js";
import { XMLHttpRequest } from "xmlhttprequest";

function _convertICalEventToCalEvent (ICALEvent) {
    const uid = ICALEvent.getFirstPropertyValue("uid");
    return new CalEvent({
        calEventId: uid,
        calEventWebcalId: uid,
        title: ICALEvent.getFirstPropertyValue("summary"),
        startDateTime: new Date(ICALEvent.getFirstPropertyValue("dtstart")),
        endDateTime: new Date(ICALEvent.getFirstPropertyValue("dtend")),
        description: ICALEvent.getFirstPropertyValue("description"),
        location: ICALEvent.getFirstPropertyValue("location"),
        rrule: ICALEvent.getFirstPropertyValue("rrule"),
        recurenceId: new Date(ICALEvent.getFirstPropertyValue("recurrence-id")),
        created: new Date(ICALEvent.getFirstPropertyValue("created")),
        lastModified: new Date(ICALEvent.getFirstPropertyValue("lastModified")),
        dtstamp: new Date(ICALEvent.getFirstPropertyValue("dtstamp")),
        exdate: new Date(ICALEvent.getFirstPropertyValue("exdate")),
        sequence: ICALEvent.getFirstPropertyValue("sequence"),
    });
}

function _getEventsFromICALFile(webcalFilename: string) {
    const iCalText = readFileSync(webcalFilename).toString();
    return _getCalEventsFromICALText(iCalText);
};

function _getCalEventsFromICALText(iCalText: string) {
    const iCalData = ICAL.parse(iCalText);
    const iCalDataComponent = new ICAL.Component(iCalData);
    const iCalEventRecords = iCalDataComponent.getAllSubcomponents("vevent");
    const calEvents = iCalEventRecords.map(_convertICalEventToCalEvent);
    return calEvents;
};

export const getCalEventsFromWebcalFile = (webcalFilename: string): CalEvent[] => {
    return _getEventsFromICALFile(webcalFilename);
};

export const getCalEventsFromWebcalURL = async (url: string): Promise<CalEvent[]> => {
    // todo: change to fetch?
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    await Http.send();
    const responseText: string = await new Promise((resolve, reject) => {
      Http.onload = e => {
      resolve(Http.responseText);
    }});
    return _getCalEventsFromICALText(responseText);
}

