|v|As a|I want to be able to|so that|
|---|----|-----|----|
|1.0.0|event orgainzer|get a list of non-repeating events and originating repeating events for a public calendar (from webcal in json format)|advertise the events on my website in an appealing format|
|1.0.0|event organizer|create, update, delete non-repeating events (using app API for backend, React for frontend)|publish to a calendar  (that also takes care of repeating events)|
|1.0.0|event organizer|get a list of all instances of an event, repeating and non-repeating||
|1.0.1|security / auditing|require user create an account to CUD||
|1.0.1|integretor|single sign on||

Overview: converts webcal => json => object of events.   First for non-repeating, then repeating.  Auth and CUD for V 1.0.1

V 1.0.0

To Do
- Create tests for converting ICS to a list of ICS event strings and vice versa 
  - given an ics url for a given calendar with repeating and non-repeating events, when iCalEvents = getICalEvents(ics url)
    - then iCalEvents is a hashtable of string keys and string values 
    - then the key for the non-repeating events equals the event id
    - then the key for the repeating event equals the event id plus the occurence id
    - then makeEventsIcsText (ical event list) equals the venvent portion of the original ics
    - and when iCal = makeIcs (iCalEvents), confirm vevent section of iCal equals the vevent portion of the given ICS url and iCal starts with BEGIN vCalendar and ends with END vCalendar
   - **take iCal, paste it into an ics file and confirm it can be imported**
- Create tests
  - can create an aggregator
  - can associate an aggregator with a URL
  - given an aggregator associated with an ICS url, vevent portion of aggregator.icsEventsComponent equals the vevent portion of the ICS url
  - can create an event group
  - can associate multiple aggregators with a URL
  - given an event group eventGroup with two aggregators, confirm aggregator.icsEventsComponent of both are contained within eventGroup.ics
  - confirm count of 
- create route for event group
- see if can subscribe locally
- store event group and aggregators
- deploy
- see if can subscribe
- add authorization
- add UI for CRUD
- add subscription URL to UI



   
Done
X Create a CalendarGroupTest google account
X Create a test calendar
X Export to an ics
X Define json for event
X Create tests
  X convert an ics file into an event array
  X convert an ics URL into an event array



V 1.0.1
- [ ] Auth changes?

