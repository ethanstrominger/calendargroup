import { AggregatedEvent } from "../../models/AggregatedEvent";
import { getAggregatedEventsFromWebcalFile } from "../WebcalUtis";
import { getAggregatedEventsFromWebcalURL } from "../WebcalUtis";
import { ICAL_FILENAME, ICAL_URL } from '../../__test-helper__/testGlobals';

describe("ICS import", () => {
    it("You can get events from an ICS", () => {
        const events = getAggregatedEventsFromWebcalFile(ICAL_FILENAME);
        expect(events[0] instanceof AggregatedEvent);
    });
});

describe("URL import", () => {
    it("You can get events from a URL", async () => {
        const events = await getAggregatedEventsFromWebcalURL(ICAL_URL);
        expect(events[0]).toBeDefined();
        expect(events[0] instanceof AggregatedEvent);
    });
});  
