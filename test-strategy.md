- npm test runs test cases
- npm test will not catch type mismatches (1 + "3").  To catch type mismatches, compile
- Create an AggEvent from webcaltext:
    - Modify existing test so attributes match entity_model.md
    - Use a provided sample event text file 
    - Create aggEvent from the sample and a default timezone
    - Confirm all lines except date fields that do not specify a timezone.
    - Confirm lines for date fields that originally do not have a timezone now specify the default timezone
        Example: If default timezone is America/New_York
          DTSTART;TZID=Europe/Berlin:20210405T130000 would stay the same
          DTSTART;TZID=America/New_York:20210405T130000Z would change to DTSTART:20210405T130000
- Test value of webcalHashMapKey when creating different types of AggEvents
  - non-repeating: {uid: < value from webcal text >} 
  - repeaing event definiton: { uid: < value from webcal text >}
  - repeating event exceptions: { uid: < value from webcal text >, recurrence_id: < value from webcal text >}
- Test getting AggEvent by aggEventUuid and by webcalHashmapKey
- Test URL routes (maybe mock)

AggEventSource
- Test given ics text, you can get a list of AggEvents which includes all the events in that ics (AggEventSource.getAggEventsFromText(text value))
- Test AggEventSource.getAggEventsFromFile(file) returns same as previous test
- Test given an aggEventSource with a valid file source, aggEventSource.getAggEvents() gets same value

Aggregrator
- Test given an aggregator with one aggEventSource, Aggregator.getAggEvents() gets same value as aggEventSource.getAppEvents()
- Test given an aggregator with two aggEventSources, Aggregator.getAggEvents() gets events from both
- Test given an aggregator with two aggEventSOurces, Aggregator.getIcs() returns a valid ICS
