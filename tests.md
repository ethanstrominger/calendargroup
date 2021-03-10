| Given                                                                                                      | When                                                                         | Then                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| given an existing webcal calendar with repeating and non-repeating events that is accessible through a URL | when you get events ( _iCalEvents = Utility.getICalEvents(url)_ )            | then you get a list of events where each event includes a unique hashkey and the webcal encoded event text                                                                                                                                                                                                                |
|                                                                                                            |                                                                              | then the eventUId for the first non-repeating event equals the uid of the ical event [_iCalEvents[ x ].eventUid=iCalEvents[ x ].iCalEventUid_]                                                                                                                                                                            |
|                                                                                                            |                                                                              | then the eventUid for the first repeating event equals the event id plus the reccurence id _iCalEvents[ x ].eventUid=iCalEvents[ x ].iCalEventUid + iCalEvents[ x ]reccurenceId_                                                                                                                                          |
|                                                                                                            |                                                                              | then combining all the vevent values of the hashtable equals the vevents portion of the original ics _[sum of iCalEvents = vevents portion of ics url]_                                                                                                                                                                   |
|                                                                                                            |                                                                              | and (then) combining a calendar from the above sum of iCalEvents, the vevent section of iCal equals the vevent portion of the given ICS url and iCal starts with BEGIN vCalendar and ends with END vCalendar _[Utility.makeCalendar(sum of iCalEvents)] = BEGIN VCALENDAR + vevents portion of ics url + END VCALENDAR ]_ |
|                                                                                                            | When you create an event aggregator with name and URL                        | then you can get the uid and URL of the event aggregator [\*EventSourceTransactons.create(name, url) => EventSourceTransactions.get(name).url = url and EventSourceTransactions.uid is defined                                                                                                                            |
| given an aggregator associated with an ICS url                                                             |                                                                              | then the vevent of the aggregator equals Aregator.equals the vevent portion of the ICS url [*eventSource.vevents = vevent portion of the ICS url*]                                                                                                                                                                        |
|                                                                                                            | When you create two eventGroups                                              | each eventGroup has a distinct uid[*EventGroupTransactions.create(name1),EventGroupActions.create(name2) => EventGroupTransactions.get(name1).uid != EventGroupTransactons.get(name2).uid* ]                                                                                                                              |
|                                                                                                            | when you associate multiple event aggregators with an event group            | then you can get the event aggregators for the event group                                                                                                                                                                                                                                                                |
| given an event group eventGroup with two event aggregators for valid ICS URL                               |                                                                              | then vevent of both are contained within the subscribable calendar _[vEventGroup.eventSource[0 and 1].vevents are contained within vEventGroup.icsText ]_                                                                                                                                                                 |
|                                                                                                            | then vEventGroup.icsText starts with START VCALENDAR and ends with VCALENDAR | ------                                                                                                                                                                                                                                                                                                                    |