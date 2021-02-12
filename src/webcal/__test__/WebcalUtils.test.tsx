import { CalEvent } from "../../models/CalEvent";
import { getCalEventsFromWebcalFile } from "../WebcalUtis";
import { getCalEventsFromWebcalURL } from "../WebcalUtis";
import { ICALFILENAME, ICAL_URL } from '../../../__test-helper__/testGlobals';

describe("ICS import", () => {
    it("You can get events from an ICS", () => {
        const events = getCalEventsFromWebcalFile(ICALFILENAME);
        expect(events[0] instanceof CalEvent);
    });
});

describe("URL import", () => {
    it("You can get events from a URL", async () => {
        const events = await getCalEventsFromWebcalURL(ICAL_URL);
        expect(events[0]).toBeDefined();
        expect(events[0] instanceof CalEvent); 
    });
});  
