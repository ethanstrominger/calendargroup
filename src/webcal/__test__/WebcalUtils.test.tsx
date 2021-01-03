import { CalEvent } from "../../models/CalEvent";
import { getCalEventsFromWebcalFile } from "../WebcalUtis";
import { ICALFILENAME} from '../../../__test-helper__/testGlobals';

describe("Calendar CRUD", () => {
    it("You can get events from an ICS", () => {
     got a   const events = getCalEventsFromWebcalFile(ICALFILENAME);
        expect(events[0] instanceof CalEvent); 
    });
});  