- npm test runs test cases
- npm test will not catch type mismatches (1 + "3"). To catch type mismatches, compile
- Create an AggEvent from icaltext for a non repeating event:
  - Modify existing test so attributes match entity_model.md
  - Use a provided sample event text file for non-repeating
  - Create aggEvent from the sample file
  - Confirm all lines the same except:
    - Confirm lines for date fields that originally do not have a timezone now specify the default timezone
      Example: If default timezone is America/New_York
      DTSTART;TZID=Europe/Berlin:20210405T130000 would stay the same
      DTSTART;TZID=America/New_York:20210405T130000Z would change to DTSTART:20210405T130000
    - Confirm description includes file path at beginning
  - Repeat test for a repeating event, except DTSTART and DTEND will already have a timezone and it will not change
  - Repeat test for an occurence exception with different date and time than expected. Same as Repeating event task, except icalHashmapKey will include recurrence_id
- Test getting a non repeating by icalHashmapKey
- repeat for
- Test URL routes (maybe mock)

AggEventSource

- Test given ics text, you can get a list of AggEvents which includes all the events in that ics (AggEventSource.getAggEventsFromText(text value))
- Test AggEventSource.getAggEventsFromFile(file) returns same as previous test
- Test given an aggEventSource with a valid file source, aggEventSource.getAggEvents() gets same value

Aggregrator

- Test given an aggregator with one aggEventSource, Aggregator.getAggEvents() gets same value as aggEventSource.getAppEvents()
- Test given an aggregator with two aggEventSources, Aggregator.getAggEvents() gets events from both
- Test given an aggregator with two aggEventSOurces, Aggregator.getIcs() returns a valid ICS
