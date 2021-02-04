import { CalEvent } from "../models/CalEvent";
import { readFileSync } from "fs";
import ICAL from "ical.js";

const _convertICalRecordToICalEvent = (calEvent): CalEvent => {
    const uid = calEvent.getFirstPropertyValue("uid");
    const retVal = new CalEvent({
        calEventId: uid,
        calEventWebcalId: uid,
        title: calEvent.getFirstPropertyValue("summary"),
        startDateTime: new Date(calEvent.getFirstPropertyValue("dtstart")),
        endDateTime: new Date(calEvent.getFirstPropertyValue("dtend")),
        description: calEvent.getFirstPropertyValue("description"),
        location: calEvent.getFirstPropertyValue("location"),
        rrule: calEvent.getFirstPropertyValue("rrule"),
        recurenceId: new Date(calEvent.getFirstPropertyValue("recurrence-id")),
        created: new Date(calEvent.getFirstPropertyValue("created")),
        lastModified: new Date(calEvent.getFirstPropertyValue("lastModified")),
        dtstamp: new Date(calEvent.getFirstPropertyValue("dtstamp")),
        exdate: new Date(calEvent.getFirstPropertyValue("exdate")),
        sequence: calEvent.getFirstPropertyValue("sequence"),
    });
    console.log('retval', retVal);
    return retVal;
}

function _getICalEventRecords(webcalFilename: string) {
    const iCalText = readFileSync(webcalFilename).toString();
    const iCalData = ICAL.parse(iCalText);
    const iCalDataComponent = new ICAL.Component(iCalData);
    const iCalEventRecords = iCalDataComponent.getAllSubcomponents("vevent");
    return iCalEventRecords;
}

export const getCalEventsFromWebcalFile = (webcalFilename: string): CalEvent[] => {
    const iCalEventRecords = _getICalEventRecords(webcalFilename);
    const calEvents = iCalEventRecords.map(_convertICalRecordToICalEvent);
    return calEvents;
};

