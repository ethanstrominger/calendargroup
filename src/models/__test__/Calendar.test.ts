import { Calendar } from "../Calendar";
import { CalEvent } from "../CalEvent";

describe("Calendar CRUD", () => {
  it("A calendar can be created", () => {
    const calendar = new Calendar();
    expect(calendar).toBeDefined();
  });

  it("Events can be added to a calendar", () => {
    const currentTime = new Date();
    const calEvent1 = new CalEvent({
      calEventId: "1",
      calEventWebcalId: "a webcalid",
      title: "a title",
      description: "a description",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });

    const tomorrowTime = new Date(currentTime.getTime() + 1000 * 60 * 60 * 24);
    const calEvent2 = new CalEvent({
      calEventId: "2",
      calEventWebcalId: "a webcalid for event 2",
      title: "a title for event 2",
      description: "a description for event 2",
      startDateTime: currentTime,
      endDateTime: new Date(currentTime.getTime() + 1000 * 60 * 60),
    });
    const calendar = new Calendar();
    calendar.addCalEvent(calEvent1);
    calendar.addCalEvent(calEvent2);
    expect(calEvent1 === calendar.calEvents["1"]).toBeTruthy();
    expect(calEvent2 === calendar.calEvents["2"]).toBeTruthy();
  });
});
