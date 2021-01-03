import { CalEvent } from "../../models/CalEvent";
import { getCalEventsFromWebcalFile } from "../WebcalUtis";
import { ICALFILENAME} from '../../../__test-helper__/testGlobals';

describe("ICS import", () => {
    it("You can get events from an ICS", () => {
        const events = getCalEventsFromWebcalFile(ICALFILENAME);
        expect(events[0] instanceof CalEvent); 
    });
});  