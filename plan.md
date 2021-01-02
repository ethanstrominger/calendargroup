|v|As a|I want to be able to|so that|
|---|----|-----|----|
|1.0.0|event orgainzer|get a list of non-repeating events and originating repeating events for a public calendar (from webcal in json format)|advertise the events on my website in an appealing format|
|1.0.0|event organizer|create, update, delete non-repeating events (using app API for backend, React for frontend)|publish to a calendar  (that also takes care of repeating events)|
|1.0.0|event organizer|get a list of all instances of an event, repeating and non-repeating||
|1.0.1|security / auditing|require user create an account to CUD||
|1.0.1|integretor|single sign on||

Overview: converts webcal => json => object of events.   First for non-repeating, then repeating.  Auth and CUD for V 1.0.1

V 1.0.0

- [X] Create a CalendarGroupTest google account
- [ ] Create a test calendar
- [ ] Export to an ics
- [ ] Define json for event
- [ ] Create a test that you can convert an ics into an event json
- [ ] Create a test that you can do that from a URL
- [ ] Use this in Website Two

V 1.0.1
- [ ] Auth changes?

