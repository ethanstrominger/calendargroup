# Syncrhonization Diagram

```
┌----------------------┐                                      ┌--------------┐
│ EXTERNAL CALENDAR /  │ ------------------------------------<|    EXTERNAL  |
│    EVENT LIST        │                                      |     EVENTS   |
└----------------------┘                                      └--------------┘
       |                                                            |
       |                                                            |
       |                                                            |
      /|\                                                          /|\
┌----------------------┐                                      ┌--------------┐
|   AGGREGATOR         |-------------------------------------<|  AGGREGATED  |
|                      |                                      |    EVENTS    |
└----------------------┘                                      └--------------┘
   \|/         \|/
    |           |
    |     ┌-------------┐    ┌-------------------┐
    |     |   FILTER    |---<| FILTER CONDITIONS |
    |     └-------------┘    └-------------------┘
    |          \|/
    |           |
┌----------------------┐
|       EVENT          | => An event group is a subscribable calendar of aggregated events
|       GROUP          |
└----------------------┘                       
```

# USER EVENT INFO

USERS ---< USER AGG EVENT INFO >---- AGG EVENTS

# ROLES

- ADMIN -> CRUD on all tables
- EVENT GROUP ADMIN --< EVENT GROUP: CRUD EVENT GROUP AND RELATED AGGREGRATORS, FILTERS, AND FILtER CONDITIONS
- EVERYONE: READ ON EVENT GROUP, FILTERS, FILTER CONDITIONS AND SUBSCRIBE TO AN EVENT GROUP

