Commands
`yarn test`

This will not catch type mismatches (1 + "3"). To catch type mismatches, run
`yarn build`

[ ] Add test for a repeating event (rrule has a value)
[ ] Add test for an exception to a repeating event (reccurence_id has a value)
[ ] Change tests so that parameter values are data driven from an array of test values. Test name should be included and should display when test fails.
[ ] Add test for icalUtil.joinObjects([icalObject1, icalObject2, icalObject3]) creates a valid ics with the events from all three icalObjects.
[ ] Add test for icalUtil.joinICalUrls([icalUrl1, icalUrl2, icalUrl3]) that it creates a valid ics with the events from the different URLs
[ ] Add test for icalUtil.joinPrefix(prefix) that gets the prefix from a configuration file that lists prefixes and their URLs and that it creates a valid ics with the events from the different URLs
[ ] Add test for route localhost:xxxx/url retrieves a calendar
