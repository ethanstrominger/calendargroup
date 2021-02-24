# Syncrhonization Diagram

```
┌----------------------┐                                      ┌------------┐
│ EXTERNAL CALENDAR /  │ ------------------------------------<|  EXTERNAL  |
│    EVENT LIST        │                                      |   EVENTS   |
└----------------------┘                                      └------------┘
          |                                                         |
          |                                                         |
          |                                                         |
         /|\                                                       /|\
┌----------------------┐                                      ┌------------┐
|        EVENT         | >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> | AGGREGATED |
|     AGGREGATOR       |                                      |   EVENTS   |
└----------------------┘                                      └------------┘
   \|/         \|/                                                   |
    |           |                                                    |
    |           |                                                    |
    |           |                                          ┌---------|---------┐
    |           |                                          |         |         |
    |     ┌-------------┐    ┌-------------------┐         |         |         |
    |     |   FILTER    |---<| FILTER CONDITIONS |         |    ┌---------┐    |
    |     └-------------┘    └-------------------┘         |    |  ICAL   |    |
    |          \|/                                         |    | EVENTS  |    |
    |           |                                          |    └---------┘    |
┌----------------------┐                                   |                   |
|       EVENT          |                                   |   SUBSCRIBABLE    |
|       GROUP          | >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> |     CALENDAR      |
└----------------------┘                                   |                   |
                                                           |                   |
                                                           └-------------------┘
                                                                    /\
                                                                    ||
                                                                    || Event Goer subscribes to calendr
                                                                    ||
                                                                 EVENT GOER

```  
# USER EVENT INFO

USERS ---< SUBSCRIBED ICAL EVENT INFO >---- AGG EVENTS

# ROLES

- ADMIN -> CRUD on all tables
- EVENT GROUP ADMIN --< EVENT GROUP: CRUD EVENT GROUP AND RELATED AGGREGRATORS, FILTERS, AND FILtER CONDITIONS
- USER -< SUBSCRIBED ICAL EVENT: CRYD
- EVERYONE -> READ ON EVENT GROUP, FILTERS, FILTER CONDITIONS AND SUBSCRIBE TO AN EVENT GROUP

