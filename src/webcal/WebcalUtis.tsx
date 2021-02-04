import { CalEvent } from "../models/CalEvent";
import { readFileSync } from "fs";
import ICAL from "ical.js";

function _convertICalEventToCalEvent (ICALEvent) {
    const uid = ICALEvent.getFirstPropertyValue("uid");
    const retVal = new CalEvent({
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
    console.log('retval', retVal);
    return retVal;
}

function _getRecordsFromICALFile(webcalFilename: string) {
    const iCalText = readFileSync(webcalFilename).toString();
    const iCalData = ICAL.parse(iCalText);
    const iCalDataComponent = new ICAL.Component(iCalData);
    const iCalEventRecords = iCalDataComponent.getAllSubcomponents("vevent");
    return iCalEventRecords;
}

export const getCalEventsFromWebcalFile = (webcalFilename: string): CalEvent[] => {
    const iCalEventRecords = _getRecordsFromICALFile(webcalFilename);
    const calEvents = iCalEventRecords.map(_convertICalEventToCalEvent);
    return calEvents;
};

