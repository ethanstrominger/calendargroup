import { CalEvent } from "../models/CalEvent";
import { readFileSync } from "fs";
import ICAL from "ical.js";

const _convertICalRecordToICalEvent = (calEvent) : CalEvent => {
    const uid = calEvent.getFirstPropertyValue("uid"); 
    return new CalEvent ({
        calEventId: uid,
        calEventWebcalId: uid,
        title: calEvent.getFirstPropertyValue("summary"),
        startDateTime: new Date(calEvent.getFirstPropertyValue("dtstart")),
        endDateTime: new Date(calEvent.getFirstPropertyValue("dtend")),
        description: calEvent.getFirstPropertyValue("description"),
        location: calEvent.getFirstPropertyValue("location"),
    });
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

